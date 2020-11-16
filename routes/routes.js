const fs = require('fs');
const path = require('path');
const router = require('express').Router();

let notes = [];
// API ROUTES
// ========================================================
router.get('/api/notes', function (req, res) {
  res.json(notes);
});
router.post('/api/notes', function (req, res) {
  let newNote = req.body;
  notes.push(newNote);
  updatefile();
  return console.log('new note: ' + newNote.title);
});
router.get('/api/notes/:id', function (req, res) {
  res.json(notes[req.params.id]);
});
router.delete('/api/notes/:id', function (req, res) {
  notes.splice(req.params.id, 1);
  updatefile();
  console.log('Deleted note with id ' + req.params.id);
});
// VIEW ROUTES
// ========================================================
router.get('/notes', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

function updatefile() {
  fs.writeFile('../db/db.json', JSON.stringify(notes, '\t'), err => {
    if (err) throw err;
    return true;
  });
}

module.exports = router;
