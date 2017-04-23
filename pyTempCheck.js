var mongoose = require('mongoose');
var TempDBB = require('./temp.js');

var uri = 'mongodb://localhost/TempLogDB';
var connection = mongoose.createConnection(uri);

var temp = TempDBB();

//mongoose get all docs. I think here answers your question directly
temp.find(function(err, results) {
  if (err) return console.error(err);

  //invoke callback with your mongoose returned result
  console.log(results);
});
