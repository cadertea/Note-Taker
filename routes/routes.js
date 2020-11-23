const fs = require('fs');
const path = require('path');
const router = require('express').Router();

let notes = [];
// API ROUTES
// ========================================================
router.get('/api/notes', function (req, res) {
  notes=JSON.parse(fs.readFileSync("./db/db.json"))
  res.json(notes);
});
router.post('/api/notes', function (req, res) {
 
  let newNote = {
    id: Math.floor(Math.random()*1000),
    title: req.body.title,
    text: req.body.text
  }

  console.log(newNote);
  notes.push(newNote);
  
  fs.writeFileSync("./db/db.json",JSON.stringify(notes),function(err){
    if(err) throw err
    res.json(notes)
  })

});
router.get('/api/notes/:id', function (req, res) {
  res.json(notes[req.params.id]);
});
router.delete('/api/notes/:id', function (req, res) {
  let newNotes = notes.filter(i => (i.id !== req.params.id));
  notes = newNotes
  fs.writeFileSync("./db/db.json",JSON.stringify(newNotes),function(err){
    if(err) throw err
    res.json(notes)
  })
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



module.exports = router;