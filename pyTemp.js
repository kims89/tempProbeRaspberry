var sensor = require('node-dht-sensor');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var cron = require('node-cron');
var TempDB = require('./temp.js');

var dato = new Date();
dato.setHours(dato.getHours() + 2);
mongoose.Promise = global.Promise;
db = mongoose.createConnection('mongodb://localhost/templogh');
db.on('error', console.error.bind(console, 'connection error:'));


sensor.read(11, 4, function(err, temperature, humidity) {
  console.log(Date() + " - Fullfort");
  if (!err) {
    var tempNow = new TempDB({
      date: dato,
      humidity: humidity.toFixed(1),
      temp: temperature.toFixed(1)
    });
    db.once('open', function() {
      console.log("open");
      tempNow.save(function(err) {
        console.log("Lagret");
        if (err) return handleError(err);
        mongoose.disconnect();
      });
    });
  }
});
