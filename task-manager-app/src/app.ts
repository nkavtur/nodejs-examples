import express from 'express';
import {MongoClient} from 'mongodb';


// const app = express();

const mongoClient = MongoClient;

const connection = 'mongodb://root:example@127.0.0.1:27017/';
const database = 'task-manager';

mongoClient.connect(connection, (error, client) => {
  console.log('HERE!');
  if (error) {
    return console.log('Unable to connect to Database!');
  }

  console.log('Successfully connected to database!')

  client.db()
});


// app.get('/hello', (req, res, next) => {
//
//   res.status(200).send({
//     message: 'Hello World'
//   });
// });
//
// app.listen(3000, () => console.log('Starting Task app'));
//
