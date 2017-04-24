var express = require('express');
var app = express();
var mongoose = require('mongoose');
var path = require('path');
var fs = require('fs');
var jsondata;

var uri = 'mongodb://localhost/TempLogHours';
mongoose.Promise = global.Promise;
var connection = mongoose.createConnection(uri);


var Schema = mongoose.Schema;
var BlogPostSchema = new Schema({
  date: Date,
  humidity: Number,
  temp: Number
});

var TempModel = connection.model('temperature', BlogPostSchema);

// viewed at http://localhost:8080
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/tempDB', function(req, res) {
  TempModel.find(function(err, results) {
    if (err) return console.error(err);
    res.end(JSON.stringify(results));
    console.log(results);
  });
});

app.get('/jsonfind/:id', function(req, res) {
  fs.readFile(__dirname + '/photos.json', function(err, data) {
    jsondata = JSON.parse(data);
    for (var i = 0; i < jsondata.length; i++) {
      if (jsondata[i].id == req.param("id")) {
        res.end(JSON.stringify(jsondata[i]));
      }
    }

  });

});

app.get('/jsonname/:navn', function(req, res) {
  fs.readFile(__dirname + '/photos.json', function(err, data) {
    jsondata = JSON.parse(data);
    result = [];
    for (var i = 0; i < jsondata.length; i++) {
      if (jsondata[i].title.includes(req.param("navn"))) {
        result.push(jsondata[i]);
      }
    }

    res.end(JSON.stringify(result));

  });

});

app.use(express.static('public'));
app.listen(8081);
