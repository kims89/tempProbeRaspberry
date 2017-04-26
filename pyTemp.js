var sensor = require('node-dht-sensor');
var mongoose = require('mongoose');
var TempDB = require('./temp.js');
var cron = require('node-cron');
cron.schedule('40 * * * *', function() {
  var dato = new Date();
  dato.setHours(dato.getHours() + 2);
  mongoose.Promise = global.Promise;
  db = mongoose.createConnection('mongodb://localhost/templogh');
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function()

  var tempSchema = mongoose.Schema({
    date: Date,
    humidity: Number,
    temp: Number


  });
  var Temperature = mongoose.model('temperature', tempSchema);

    sensor.read(11, 4, function(err, temperature, humidity) {
      console.log(dato + " - Fullfort");
      if (!err) {
        var tempNow = new Temperature({
          date: dato,
          humidity: humidity.toFixed(1),
          temp: temperature.toFixed(1)
        });

        tempNow.save(function(err, data) {
          console.log("Lagret");
          if (err) return console.error(err);
          mongoose.disconnect();
        });
      }
    });
  });

});
