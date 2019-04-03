var express = require('express');
var router = express.Router();

const geocode = require('./utils/geocode.js');
const getWeather = require('./utils/getWeather.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Weather' });
});



router.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "要提供位置喔!"
    });
  }

  // 拿緯度資料or 錯誤
  geocode(req.query.address, (errorMessage, results) => {
    if (errorMessage) {
      return res.send({errorMessage});
    } else {
      // console.log(results.address);

      // 抓氣象預報
      getWeather(results.latitute, results.longitute, (errorMessage, weatherResults) =>{
        if (errorMessage) {
          return res.send({errorMessage});
        } else {
          // console.log(JSON.stringify(weatherResults, undefined, 2));

          res.send({
            forecast: `現在溫度攝氏 ${weatherResults.temperature}度， 體感溫度攝氏 ${weatherResults.apparentTemperature}度`,
            location: results.address
            // address: req.query.address,
          })
        }
      });
    }
  });

});

module.exports = router;
