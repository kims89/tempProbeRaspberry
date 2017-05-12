var sensor = require('node-dht-sensor');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var cron = require('node-cron');
var TempDB = require('../temp.js');
var tempr;
var humir;

var dato = new Date();
dato.setHours(dato.getHours() + 2);
mongoose.Promise = global.Promise;
db = mongoose.createConnection('mongodb://localhost/templogh');
db.on('error', console.error.bind(console, 'connection error:'));

sensor.read(11, 4, function(err, temperature, humidity) {
  console.log(humidity.toFixed(1) + " temperatur");
  if (!err) {
    tempr = temperature.toFixed(1);
    humir = humidity.toFixed(1);
  }
});

var tempNow = new TempDB({
  date: dato,
  humidity: humir,
  temp: tempr
});

db.once('open', function() {
  console.log("open");
  tempNow.save(function(err) {
    console.log("Lagret");
    if (err) return handleError(err);
    mongoose.disconnect();
  });
});
