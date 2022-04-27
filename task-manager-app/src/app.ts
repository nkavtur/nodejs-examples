import express, {json, NextFunction, Request, Response} from 'express';
import {connect, ConnectOptions} from 'mongoose';

import {router} from './routes';
import chalk from 'chalk';

const app = express();
const port = process.env.PORT || 3000;
const DB_CONNECTION_URL = 'mongodb://root:example@127.0.0.1:27017';

app.use(json());
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('Handling ERROR!!!!')
  res.status(500).send({message: err.message});
});
app.use(router);

async function setupDb() {
  console.log('Connecting to Mongo DB...');
  await connect(DB_CONNECTION_URL, {
    dbName: 'task-manager',
    autoIndex: true
  } as ConnectOptions);

  // console.log('Clearing collections...');
  // await User.deleteMany();
  // await Task.deleteMany();
}


app.listen(port, () => {
  console.log(`Starting Application...`);

  setupDb().then(() => {
    console.log(chalk.green(`Task Manager API succesfully started on port=${port}!`));
  }).catch((error) => {
    console.log(chalk.red(`Application failed to start. Reason: ${error}.`));
  });
});


