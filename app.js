const yargs = require('yargs')

const geocode = require('./geocode/geocode')
const weather = require('./weather/weather')

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

geocode.geocodeAddress(argv.a, (locationError, locationResult) => {
  if (locationError) {
    console.log(locationError)
  } else {
    console.log(JSON.stringify(locationResult, undefined, 2))
    weather.getWeather(locationResult, (weatherError, weatherResult) => {
      if (weatherError) {
        console.log(weatherError)
      } else {
        console.log(weatherResult)
      }
    })
  }
})
