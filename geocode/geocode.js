const request = require('request')

var geocodeAddress = (address, callback) => {
  var requestAddress = encodeURIComponent(address)

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${requestAddress}`,
    json: true
  }, (error, response, body) => {
    // console.log(JSON.stringify(response, undefined, 2)) // Printing prettier JSON to the terminal
    if (error) {
      callback('Unable to connect to Google Server')
    } else if (body.status === 'ZERO_RESULTS') {
      callback(`Unable to find address for ${address}`)
    } else {
      var location = {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      }
      callback(undefined, location)
    }
  })
};

module.exports.geocodeAddress = geocodeAddress;
