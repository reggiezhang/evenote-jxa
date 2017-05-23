#!/usr/bin/env node
let enJxa = require('../evernote-jxa');


console.log('Notebook created: ' + enJxa.createNotebook('evernote-jxa-test'));
let paramsFilePath = `${__dirname}/testParam.json`;
console.log(`paramsFile: ${paramsFilePath}`);
let createdNoteId = enJxa.createNote(paramsFilePath);
console.log('note created: %s', createdNoteId);
console.log('find note: ' + enJxa.findNote(createdNoteId));
let notebookName = enJxa.deleteNote(createdNoteId);

console.log('delete it from: ' + notebookName);

console.log(`note still exists: ${enJxa.deleteNote(createdNoteId) !== undefined}`);

console.log('Found notebook: ' + enJxa.findNotebook(notebookName));
console.log('notebook deleted: ' + enJxa.deleteNotebook(notebookName));

console.log('find note: ' + enJxa.findNote('not exist'));
