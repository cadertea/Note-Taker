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



app.listen(PORT, function () {
  console.log('App listening on port ' + PORT);
  console.log('Server listening on: http://localhost:' + PORT);
});
