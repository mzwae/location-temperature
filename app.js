require('dotenv').load();
var path = require('path');
var express = require('express');
var zipdb = require('zippity-do-dah');
var ForecastIo = require('forecastio');

var app = express();
var weather = new ForecastIo('078355572a5837b3d49f6152d95cae2d');

app.use(express.static(path.resolve(__dirname, 'public')));

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render('index');
});

app.get();

app.use(function(req, res){
  res.status(404).render('404');
});

app.listen(3000, function(){
  console.log('Weather Forecast Server listening on port 3000...');
});

