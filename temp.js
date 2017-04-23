var mongoose = require('mongoose');
var tempSchema = mongoose.Schema({
  date: Date,
  humidity: Number,
  temp: Number

});
module.exports = mongoose.model('temperature', tempSchema);
