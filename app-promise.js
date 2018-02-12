const yargs = require('yargs')
const axios = require('axios')

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var requestAddress = encodeURIComponent(argv.address)
var requestURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${requestAddress}`

axios.get(requestURL)
  .then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
      throw new Error('Unable to find that address')
    }
    var lat = response.data.results[0].geometry.location.lat
    var lng = response.data.results[0].geometry.location.lng
    var weatherURL = `https://api.darksky.net/forecast/bb63e464f749605fee415de4f5b5d303/${lat},${lng}`

    return axios.get(weatherURL)
  })
  .then((response) => {
    var temperature   = response.data.currently.temperature
    var apparentTemp  = response.data.currently.apparentTemperature
    console.log(`It's currently ${temperature} and feels like ${apparentTemp}`)
  })
  .catch((e) => {
    if (e.code == 'ENOTFOUND') {
      console.log('unable to connect')
    } else {
      console.log(e.message)
    }
  })
