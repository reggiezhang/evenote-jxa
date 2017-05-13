#!/usr/bin/env node
var enJxa = require('../evernote-jxa');

var noteId = 'qqqqq'
var nbName = enJxa.deleteNote(noteId);
console.log(`find note ${noteId} = ${nbName !== null}`);

console.log("Found notebook 'Books': " + enJxa.findNotebook('Books'));

enJxa.createNote('./testParam.json');



