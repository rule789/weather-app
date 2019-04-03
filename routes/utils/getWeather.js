// 取回temperature

const request = require('request');

var getWeather = ( lat, lon, callback) =>{
  request({
    url: `https://api.darksky.net/forecast/f024d2b4982267aa43248b50967e53d8/${lat},${lon}?units=si`,
    json: true,
  } , (error, response, body) =>{
    // console.log(body);
    if(error) {
      callback('error!! cannot connect');
    } else if ( response.statusCode === 400) {
      callback('type wrong!');
    } else if (!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature,
      });
    } else {
      callback('Unable to fetch weather');
    }
  });
};


module.exports = getWeather;

