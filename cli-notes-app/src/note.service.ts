import Note from './note.model';
import * as fs from 'fs';
import path from 'path';
import {plainToInstance} from 'class-transformer';
import chalk from 'chalk';

const DB_PATH = path.resolve(__dirname, '../db.json');

const loadNotes = (): Note[] => {
  try {
    const dataBuffer = fs.readFileSync(DB_PATH);
    const rawNotes = JSON.parse(dataBuffer.toString());
    return plainToInstance(Note, rawNotes);
  } catch (error) {
    console.log(chalk.yellow('Empty Database... Creating new database!!'));
    return [];
  }
};

const saveNote = (notes: Note[]) => {
  const rawNotes = notes.map(it => it.asRaw());
  fs.writeFileSync(DB_PATH, JSON.stringify(rawNotes));
};

export const addNote = (newNote: Note) => {
  const notes = loadNotes();
  const duplicate = notes.find(it => it.title === newNote.title);

  if (!duplicate) {
    notes.push(newNote);
    saveNote(notes);
    console.log(chalk.green(`Successfully added new note - ${newNote.asJson()}`));
  } else {
    console.log(chalk.red(`Attempt to add duplicate note. Note with ${newNote.title} title already exists`));
  }
};

export const removeNote = (title: string): Note | undefined => {
  const notes = loadNotes();
  const foundIndex = notes.findIndex(it => it.title === title);

  if (foundIndex >= 0) {
    const removedNote = notes[foundIndex];
    notes.splice(foundIndex, 1);

    saveNote(notes);
    console.log(chalk.green(`Successfully removed note with ${title} title`));

    return removedNote;
  } else {
    console.log(chalk.yellow(`Cannot remove note - note with ${title} title does not found`));
  }
};

export const listNotes = (): Note[] => {
  const notes = loadNotes();

  console.log(chalk.green(`Listing out notes`));
  for (const note of notes) {
    console.log(note.asJson());
  }

  return notes;
};

export const readNote = (title: string): Note | undefined => {
  const notes = loadNotes();
  const foundNote = notes.find(it => it.title === title);

  console.log(chalk.green(`Found note by title=${title} - ${foundNote?.asJson()}`));

  return foundNote;

};
