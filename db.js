var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  var kittySchema = mongoose.Schema({
    name: String
});
var Kitten = mongoose.model('Kitten', kittySchema);
var silence = new Kitten({ name: 'Silence2' });
silence.save(function (err, fluffy) {
  if (err) return console.error(err);

});

Kitten.find(function (err, kittens) {
  if (err) return console.error(err);
  console.log(kittens);
})
});
