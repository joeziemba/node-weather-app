const request = require('request')

var getWeather = (location, callback) => {
  request({
    url: `https://api.darksky.net/forecast/bb63e464f749605fee415de4f5b5d303/${location.latitude},${location.longitude}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to Dark Skies Server')
    } else if (body.code == 400) {
      callback(`Unable to find weather for ${address}`)
    } else {
      callback(undefined, {
        address: location.address,
        temperature: body.currently.temperature
      })
    }
  })

}

module.exports.getWeather = getWeather;
