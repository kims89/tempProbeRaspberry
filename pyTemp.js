var sensor = require('node-dht-sensor');
var mongoose = require('mongoose');
var TempDB = require('./temp.js');
var cron = require('node-cron');
cron.schedule('0 * * * * *', function() {
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost/TemperaturLogDB');
  dato = new Date();

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    sensor.read(11, 4, function(err, temperature, humidity) {
      console.log(dato + " - Fullfort");
      if (!err) {
        var tempNow = new TempDB({
          date: dato,
          humidity: humidity.toFixed(1),
          temp: temperature.toFixed(1)
        });

        tempNow.save(function(err, data) {
          if (err) return console.error(err);
          mongoose.disconnect();
        });
      }
    });
  });

});
