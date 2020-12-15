const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");

const app = express();
const PORT = 3000;

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

  // Add the new note to the db.json file
  fs.readFile("db/db.json", function(err, data) {
    var notesArr = JSON.parse(data);
    notesArr.push(newNote);
    fs.writeFile("db/db.json", JSON.stringify(notesArr), function(err) {
      err
      ? console.log(err)
      : console.log("Note successfully added to file.")
    });
  });

  res.json(newNote);

});

app.delete("/api/notes/:id", function(req, res) {
  var identifier = req.params.id;

  // Access the note in the db.json file
  fs.readFile("db/db.json", function(err, data) {
    var notesArr = JSON.parse(data);
    const found = notesArr.some(note => note.id === identifier);

      notesArr.forEach(note => {
        note.id === identifier
        ? notesArr.splice(notesArr.indexOf(note), 1)
        : console.log("Oops, something went wrong when deleting the note.")
      })
      // notesArr.splice(notesArr.indexOf(found), 1)
      fs.writeFile("db/db.json", JSON.stringify(notesArr), function(err) {
        err
        ? console.log(err)
        : console.log("Note successfully delete from file.")
      });

    
  });

  res.sendFile(path.join(__dirname, "/db/db.json")); 
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});