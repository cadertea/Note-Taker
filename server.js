const fs = require('fs');
const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3000;
const routes = require('./routes/routes');
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(routes);

// Setup notes variable
// fs.readFile('db/db.json', 'utf8', (err, data) => {
//   if (err) throw err;
//   var notes = JSON.parse(data);
// });

// API ROUTES
// ========================================================

app.listen(PORT, function () {
  console.log('App listening on port ' + PORT);
  console.log('Server listening on: http://localhost:' + PORT);
});
