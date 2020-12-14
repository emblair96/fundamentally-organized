const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");

const app = express();
const PORT = 3000;

const notes = [];

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
  
app.get("/notes", function(req, res) {
res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/db/db.json"));  
});

app.post("/api/notes", function(req, res) {
  var newNote = req.body;
  newNote.id = uuid.v4();
  console.log(newNote);
  notes.push(newNote);

  // Add the new note to the db.json file
  fs.readFile("db/db.json", function(err, notes) {
    var json = JSON.parse(notes);
    json.push(newNote);
    fs.writeFile("db/db.json", JSON.stringify(json), function(err) {
      err
      ? console.log(err)
      : console.log("Note successfully added to file.")
    });
  });

  res.json(newNote);

});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});