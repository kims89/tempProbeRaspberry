var sensor = require('node-dht-sensor');
var mongoose = require('mongoose');
var schedule = require('node-schedule');
cron.schedule('0 0 * * * *', function() {
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost/temp');

  var db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {

    var tempSchema = mongoose.Schema({
      date: Date,
      humidity: Number,
      temp: Number


    });
    var Temperature = mongoose.model('temperature', tempSchema);

    sensor.read(11, 4, function(err, temperature, humidity) {
      if (!err) {
        var tempNow = new Temperature({
          date: Date(),
          humidity: humidity.toFixed(1),
          temp: temperature.toFixed(1)
        });

        tempNow.save(function(err, data) {
          if (err) return console.error(err);
          mongoose.disconnect();
        });

        console.log('temp: ' + temperature.toFixed(1) + '°C, ' +
          'humidity: ' + humidity.toFixed(1) + '%'
        );
      }
    });

    Temperature.find(function(err, data) {
      if (err) return console.error(err);
      console.log(data);
    })
  });
  (1) + '%'
);
}
});

Temperature.find(function(err, data) {
if (err) return console.error(err);
console.log(data);
})
});
});
