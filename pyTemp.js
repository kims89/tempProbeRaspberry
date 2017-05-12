var sensor = require('node-dht-sensor');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var cron = require('node-cron');
var TempDB = require('./temp.js');
var dato = new Date();

dato.setHours(dato.getHours() + 2);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/templogh');

sensor.read(11, 4, function(err, temperature, humidity) {
  console.log(humidity.toFixed(1) + " temperatur");
  if (!err) {
    new TempDB({
      date: dato,
      humidity: humidity.toFixed(1),
      temp: temperature.toFixed(1)
    }).save();
    mongoose.connection.close();
  }
});
