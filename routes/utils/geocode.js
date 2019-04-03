// 用location抓經緯度
// 把發請求跟拿回lat lng資料單獨放一個檔案 再傳回去
const request = require('request');

const geocode = (address, callback) =>{

  var address = encodeURIComponent(address);

  request({
    url:`http://www.mapquestapi.com/geocoding/v1/address?key=1UpkSAETy5Gssd20LssGAZ4t65qG4AbU&location=${address}`,
    json:true,
  }, (error,response,body) => {
    if(error){
      callback('Unable to connect to Google servers.');
    } else if (body.info.statuscode === 'ZERO_RESULTS') {
      callback('Unable to find this address.');
    } else if (body.info.statuscode === 0){
      callback(undefined, {
         address:body.results[0].providedLocation.location,
         latitute:body.results[0].locations[0].latLng.lat,
         longitute:body.results[0].locations[0].latLng.lng,
      });
    }
  });

};

module.exports = geocode;
