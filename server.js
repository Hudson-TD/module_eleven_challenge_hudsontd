// Global imports
const express = require('express');
const fs = require('fs');
const path = require('path'); 

//Port structure for hosting and local machine
const PORT = process.env.PORT || 3001;
const app = express();

// Importing JSON data
const noteSource = require('./db/db.json');

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

function createNewNote(body, notesArray) {
  const newNote = body;
  if (!Array.isArray(notesArray))
      notesArray = [];
  
  if (notesArray.length === 0)
      notesArray.push(0);

  body.id = notesArray[0];
  notesArray[0]++;
  notesArray.push(newNote);
  
  fs.writeFileSync(
      path.join(__dirname, './db/db.json'),
      JSON.stringify(notesArray, null, 2)
  );
  return newNote;
}

//
app.post('/api/notes', (req, res) => {
  const newNote = createNewNote(req.body, noteSource);
  res.json(newNote);
});

// Setting up port
app.listen(PORT, () =>
// General console log for easy http link access
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);