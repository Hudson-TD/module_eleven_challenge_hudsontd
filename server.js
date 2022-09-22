// Imports
const express = require('express');
const fs = require('fs');
const path = require('path'); 

//Port structure for hosting and local machine
const PORT = process.env.PORT || 3001;
const app = express();

// Importing JSON data
const noteSource = require('./db/db.json');
currentID = noteSource.length;

app.use(express.urlencoded ( { extended: true }));
app.use(express.json());
app.use(express.static('public')); 

// Setting default routing to our index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// Pulling JSON data from our database
app.get('/api/notes', (req, res) => {
  res.json(noteSource);
});

// Get routing for our notes.html file
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// Sending new note object to database array via push
app.post("/api/notes", function (req, res) {
  var newNote = req.body;

  newNote["id"] = currentID +1;
  currentID++;
  console.log(newNote);

  noteSource.push(newNote);
  // Calling write function to update database after each new entry
  createNewNote();

  return res.status(200).end();
});

// Write function
function createNewNote() {
  fs.writeFile("db/db.json", JSON.stringify(noteSource), function (err) {
      if (err) {
          console.log("error")
          return console.log(err);
      }

      console.log("Success!");
  });
}

// Setting up port
app.listen(PORT, () =>
// General console log for easy http link access
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);