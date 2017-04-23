var mongoose = require('mongoose');
var TempDB = require('./temp.js');

var uri = 'mongodb://localhost/TempLogDB';
var connection = mongoose.createConnection(uri);


TempDB.find(function(err, results) {
  if (err) return console.error(err);

  //invoke callback with your mongoose returned result
  console.log(results);
});
