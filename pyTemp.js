var sensor = require('node-dht-sensor');
var mongoose = require('mongoose');
var TempDB = require('./temp.js');
var cron = require('node-cron');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/TemperaturLogVen');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  cron.schedule('0 * * * * *', function() {
    sensor.read(11, 4, function(err, temperature, humidity) {
      console.log(Date() + " - Fullfort");
      if (!err) {
        var tempNow = new TempDB({
          date: Date(),
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
