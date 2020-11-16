const fs = require('fs');
const path = require('path');
const express = require ('express');
const PORT = process.env.PORT || 3000;
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static(__dirname + '../public'));
// app.use('/static', express.static('public'))
app.use(express.static("public"));
    // Setup notes variable
    fs.readFile("../db/db.json","utf8", (err, data) => {
        if (err) throw err;
        var notes = JSON.parse(data);
        // API ROUTES
        // ========================================================
        app.get("/api/notes", function(req, res) {
            res.json(notes);
        });
        app.post("/api/notes", function(req, res) {
            let newNote = req.body;
            notes.push(newNote);
            updatefile();
            return console.log("new note: "+ newNote.title);
        });
        app.get("/api/notes/:id", function(req,res) {
            res.json(notes[req.params.id]);
        });
        app.delete("/api/notes/:id", function(req, res) {
            notes.splice(req.params.id, 1);
            updatefile();
            console.log("Deleted note with id "+ req.params.id);
        });
        // VIEW ROUTES
        // ========================================================
        app.get('/notes', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });
        app.get('/', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });
        function updatefile() {
            fs.writeFile("../db/db.json",JSON.stringify(notes,'\t'),err => {
                if (err) throw err;
                return true;
            });
        }
        app.listen(PORT, function() {
            console.log("App listening on port " + PORT);
            console.log("Server listening on: http://localhost:" + PORT);
        })
    });