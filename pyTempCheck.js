var mongoose = require('mongoose');

//connection to Mongodb instance running on=======
//local machine or anywhere=========================
var uri = 'mongodb://localhost/TemperaturLogDB';
var connection = mongoose.createConnection(uri);


//Define Schema==================================
var Schema = mongoose.Schema;
var BlogPostSchema = new Schema({
  date: Date,
  humidity: Number,
  temp: Number
});

var BlogPostModel = connection.model('temperature', BlogPostSchema);

//mongoose get all docs. I think here answers your question directly
BlogPostModel.find(function(err, results) {
  if (err) return console.error(err);

  //invoke callback with your mongoose returned result
  console.log(results);
});
