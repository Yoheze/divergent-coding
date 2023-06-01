// backend built with express and node
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

// parses json data and attaches it to the req.body
app.use(express.json());

// Serve static files from dist folder
app.use(express.static(path.join(__dirname, '../client/dist')));

// post request is handled here
app.post('/new-warehouse', (req, res) => {
  console.log(req.body);
  /* Normally this would include more middleware to lead to encryption of passwords, communicating with databases.
  I did not want to go to overboard on this assignment. Reference the readme as I mention some of my other experiences there*/
  res.status(200).json(req.body)
});

// serve HTML page on any route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// port for local machine
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
