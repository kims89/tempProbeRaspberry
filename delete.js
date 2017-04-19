var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/temp1');
<<<<<<< HEAD
mongoose.connection.db.dropDatabase(function(err, result) {});
=======
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

});
>>>>>>> b0b454e99c09bce159d377902ea4f8883c258c9c
