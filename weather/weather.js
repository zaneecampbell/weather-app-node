const request = require('request')

const getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/77bb2bfa7a3d8d204021a7de87ff8f1e/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Forecast.io servers');
        } else if (response.statusCode === 400) {
            callback('Location not found');
        } else if (!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        } else {
            callback('Unable to fetch weather')
        }
    });
};

module.exports.getWeather = getWeather;