var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/temp1');
mongoose.connection.db.dropDatabase(function(err) {
  console.log('db dropped');
});
