const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

const notes = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
  
app.get("/notes", function(req, res) {
res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.post("/api/notes", function(req, res) {
  var newNote = req.body;
  console.log(newNote);
  notes.push(newNote);
  res.json(newNote);
});

app.get("/api/notes", function(req, res) {
  res.json(notes);
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});