var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/temp1');
mongoose.connection.collections['temperature'].drop(function(err) {
  console.log('collection dropped');
});
