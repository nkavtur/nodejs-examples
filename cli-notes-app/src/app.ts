import 'reflect-metadata';
import yargs, {ArgumentsCamelCase} from 'yargs';
import {addNote, listNotes, readNote, removeNote} from './note.service';
import Note from './note.model';

yargs.version('1.1.0');

yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note description',
      demandOption: true,
      type: 'string'
    }
  },
  handler: (argv: ArgumentsCamelCase<{ title: string, body: string }>) => {
    addNote(new Note(argv.title, argv.body));
  }
});

yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler: (argv: ArgumentsCamelCase<{ title: string }>) => {
    removeNote(argv.title);
  }
});

yargs.command({
  command: 'list',
  describe: 'Listing out all notes',
  handler: () => {
    listNotes();
  }
});


yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    title: {
      description: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler: (argv: ArgumentsCamelCase<{ title: string }>) => {
    readNote(argv.title);
  }
});

console.log('Starting...')
setTimeout(() => {
  console.log('I am here');
}, 2000);
console.log('Ending...')

yargs.parse();
