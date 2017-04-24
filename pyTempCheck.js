var mongoose = require('mongoose');

var uri = 'mongodb://localhost/TempLogHours';
mongoose.Promise = global.Promise;
var connection = mongoose.createConnection(uri);


var Schema = mongoose.Schema;
var BlogPostSchema = new Schema({
  date: Date,
  humidity: Number,
  temp: Number
});

var TempModel = connection.model('temperature', BlogPostSchema);

//mongoose get all docs. I think here answers your question directly
TempModel.find(function(err, results) {
  if (err) return console.error(err);

  //invoke callback with your mongoose returned result
  console.log(results);
});
