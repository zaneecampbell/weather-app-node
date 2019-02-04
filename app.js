// const yargs = require('yargs');

// const geocode = require('./geocode/geocode.js')

// const argv = yargs
//     .options({
//         a: {
//             demand: true,
//             alias: 'address',
//             describe: 'Address to fetch weather for',
//             string: true
//         }
//     })
//     .help()
//     .alias('help', 'h')
//     .argv;

// geocode.geocodeAddress(argv.address, (errorMessage, results) => {
//     if (errorMessage) {
//         console.log(errorMessage);
//     } else {
//         console.log(JSON.stringify(results, undefined, 2))
//     }
// });

// 77bb2bfa7a3d8d204021a7de87ff8f1e

const request = require('request')

request({
    url: `https://api.darksky.net/forecast/77bb2bfa7a3d8d204021a7de87ff8f1e/48.009398,-122.319661`,
    json: true
}, (error, response, body) => {
    if (error) {
        console.log('Unable to connect to Forecast.io servers');
    } else if (response.statusCode === 400) {
        console.log('Location not found');
    } else if (!error && response.statusCode === 200) {
        console.log(body.currently.temperature)
    } else {
        console.log('Unable to fetch weather')
    }
});