var sensor = require('node-dht-sensor');
var mongoose = require('mongoose');
var cron = require('node-cron');
cron.schedule('0 * * * *', function() {
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost/TemperaturLogVen');

  var db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {

    var tempSchema = mongoose.Schema({
      date: Date,
      humidity: Number,
      temp: Number

    });
    var Temperature = mongoose.model('temperature', tempSchema);


    Temperature.find(function(err, data) {
      if (err) return console.error(err);
      console.log(data);
    });
  });
});
