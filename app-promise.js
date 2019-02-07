const yargs = require('yargs');
const axios = require('axios');

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

    const encodedAddress = encodeURIComponent(argv.address);
    const geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=wDHtLASd5RVoGHXOKFSiX2ORMRpG7Yzd&location=${encodedAddress}`;

    axios.get(geocodeUrl).then((response) => {
        if (!response.data || response.data.results[0].locations[0].adminArea5 === "") {
            throw new Error('Unable to find that address');
        }
        const lat = response.data.results[0].locations[0].latLng.lat;
        const lng = response.data.results[0].locations[0].latLng.lng;
        const weatherUrl = `https://api.darksky.net/forecast/77bb2bfa7a3d8d204021a7de87ff8f1e/${lat},${lng}`;
        console.log(response.data.results[0].providedLocation.location);
        return axios.get(weatherUrl);
    }).then((response) => {
        const temperature = response.data.currently.temperature;
        const apparentTemperature = response.data.currently.apparentTemperature;
        console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
    }).catch((e) => {
        if (e.code === 'EAI_AGAIN') {
            console.log('Unable to connect to API servers.')
        } else {
            console.log(e.message);
        }
    });