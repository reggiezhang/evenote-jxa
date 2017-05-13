#!/usr/bin/env node
var enJxa = require('../evernote-jxa');

var noteId = 'qqqqq'
var nbName = enJxa.deleteNote(noteId);
console.log(`find note ${noteId} = ${nbName !== null}`);

var createdNoteId = enJxa.createNote('./testParam.json');
console.log("note created: %s", createdNoteId);
var notebookName = enJxa.deleteNote(createdNoteId);
console.log('delete note from: ' + notebookName);
console.log("Found notebook: " + enJxa.findNotebook(notebookName));
//var notebookName = enJxa.deleteNote(createdNoteId);
//enJxa.deleteNotebook(notebookName)



