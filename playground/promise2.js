const request = require('request')

var geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    var requestAddress = encodeURIComponent(address)
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${requestAddress}`,
      json: true
    }, (error, response, body) => {
      // console.log(JSON.stringify(response, undefined, 2)) // Printing prettier JSON to the terminal
      if (error) {
        reject('Unable to connect to Google Server')
      } else if (body.status === 'ZERO_RESULTS') {
        reject(`Unable to find address for ${address}`)
      } else {
        var location = {
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        }
        resolve(location)
      }
    })
  })
}

geocodeAddress(90000)
  .then((location) => {
    console.log(JSON.stringify(location, undefined, 2))
  })
  .catch((error) => {
    console.log(error)
  })
