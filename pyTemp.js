var sensor = require('node-dht-sensor');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/temp1');

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
