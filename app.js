require('dotenv').load();
var path = require('path');
var express = require('express');
var router = express.Router();
var zipdb = require('zippity-do-dah');
var ForecastIo = require('forecastio');
var logger = require('morgan');
var bodyparser = require('body-parser');
var weather = new ForecastIo(process.env.API_KEY);
var googleMapKey = process.env.GOOGLE_KEY; 

var app = express();
app.use(logger('short'));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: false
}));

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.static(path.resolve(__dirname, 'client')));
app.set('views', path.resolve(__dirname, 'client', 'index.html'));


app.post('/api/v1/geodata', function (req, res, next) {
  var lat = req.body.lat;
  var long = req.body.long;
  var options = {
    units: 'si'
  };
  weather.forecast(lat, long, options, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    res.json({
      temperature: data.currently.temperature,
      timezone: data.timezone,
      key: googleMapKey
    });
  });
});

app.use(function (req, res) {
  res.status(404);
  res.send("404 Page Not Found!");

});

app.listen(3000, function () {
  console.log('Weather Forecast Server listening on port 3000...');
});