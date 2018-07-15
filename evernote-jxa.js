/*
 * evernote-jxa.js
 * Copyright (C) 2017 Reggie Zhang <reggy.zhang@gmail.com>
 * Licensed under the terms of The GNU Lesser General Public License (LGPLv3):
 * http://www.opensource.org/licenses/lgpl-3.0.html
 *
 */

'use strict';
const runJxa = require('run-jxa');

function createNote(namedParamFilePath) {
  return runJxa.sync((namedParamFilePath) => {
    let EN = Application('Evernote'); // eslint-disable-line no-undef, new-cap
    let app = Application.currentApplication(); // eslint-disable-line no-undef, new-cap
    app.includeStandardAdditions = true;
    let file = app.openForAccess(Path(namedParamFilePath), {writePermission: false}); // eslint-disable-line no-undef, new-cap

    let paramObj;
    if (app.getEof(file) > 0) {
      paramObj = JSON.parse($.NSString.alloc.initWithUTF8String(app.read(file)).cString); // eslint-disable-line no-undef
      app.closeAccess(file);
    }

    if (paramObj.created) {
      paramObj.created = new Date(paramObj.created);
    }

    if (paramObj.attachments) {
      paramObj.attachments.forEach(function(item, index) {
        paramObj.attachments[index] = Path(item); // eslint-disable-line no-undef, new-cap
      });
    }

    let note = EN.createNote(paramObj);
    if (paramObj.latitude) {
      note.latitude = paramObj.latitude;
    }
    if (paramObj.longitude) {
      note.longitude = paramObj.longitude;
    }

    note.modificationDate = note.creationDate;
    return note.id().trim();
  }, [namedParamFilePath]);
}
function deleteNote(noteId) { // workaround solution
  return runJxa.sync((noteId) => {
    const EN = Application('Evernote'); // eslint-disable-line no-undef, new-cap
    let notebookName;
    try {
      let note = EN.notebooks()[0].notes.byId(noteId);
      notebookName = note.notebook().name();
      EN.delete(note);
    } catch (e) {
      // console.log(e);
    }
    return notebookName;
  }, [noteId]);
}

function findNote(noteId) { // workaround solution
  return runJxa.sync((noteId) => {
    const EN = Application('Evernote'); // eslint-disable-line new-cap, no-undef
    let noteTitle;
    try {
      let note = EN.notebooks()[0].notes.byId(noteId);
      noteTitle = note.title();
    } catch (e) {
      // console.log(e);
    }
    return noteTitle !== undefined;
  }, [noteId]);
}
function createNotebook(nbName) {
  return findNotebook(nbName) ? nbName : runJxa.sync((nbName) => {
    return Application('Evernote').createNotebook(nbName, {withType: 'local only'}).name(); // eslint-disable-line no-undef, new-cap
  }, [nbName]);
}

function deleteNotebook(nbName) {
  return findNotebook(nbName) ? (runJxa.sync((nbName) => {
    const EN = Application('Evernote'); // eslint-disable-line no-undef, new-cap
    EN.delete(EN.notebooks.byName(nbName));
  }, [nbName]), true) : false;
}

function findNotebook(nbName) {
  return runJxa.sync((nbName) => {
    return Application('Evernote').notebooks().find((elem) => elem.name() === nbName) !== undefined; // eslint-disable-line no-undef, new-cap
  }, [nbName]);
}

module.exports = {
  createNote, deleteNote, findNote, createNotebook, findNotebook, deleteNotebook,
};
