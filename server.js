// Global imports
const express = require('express');
const fs = require('fs');
const path = require('path'); 

//Port structure for hosting and local machine
const PORT = process.env.PORT || 3001;
const app = express();

const noteSource = require('./db/db.json');

app.use(express.urlencoded ( { extended: true }));
app.use(express.json());
app.use(express.static('public')); 

// Setting default routing to our index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/api/notes', (req, res) => {
  res.json(noteSource);
});

// Get routing for our notes.html file
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// Setting up port
app.listen(PORT, () =>
// General console log for easy http link access
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);