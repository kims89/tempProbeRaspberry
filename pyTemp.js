var sensor = require('node-dht-sensor');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var cron = require('node-cron');
<<<<<<< HEAD
cron.schedule('50 * * * *', function() {
=======
cron.schedule('38 * * * *', function() {
>>>>>>> parent of 8c8f37f... sdsd
  var dato = new Date();
  dato.setHours(dato.getHours() + 2);
  mongoose.Promise = global.Promise;
  db = mongoose.createConnection('mongodb://localhost/templogh');
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
  });


  var tempSchema = new Schema({
    date: Date,
    humidity: Number,
    temp: Number
  });

  var tempNow = mongoose.model('Temp', tempSchema);

  sensor.read(11, 4, function(err, temperature, humidity) {
    console.log(Date() + " - Fullfort");
    if (!err) {
      var tempNow = new TempDB({
        date: dato,
        humidity: humidity.toFixed(1),
        temp: temperature.toFixed(1)
      });
      tempNow.save(function(err) {
        console.log("Lagret");
        if (err) return handleError(err);
        mongoose.disconnect();
      });
    }
  });

});
