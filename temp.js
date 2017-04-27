var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var tempSchema = new Schema({
  date: Date,
  humidity: Number,
  temp: Number
});

module.exports = mongoose.model('Temp', tempSchema);
