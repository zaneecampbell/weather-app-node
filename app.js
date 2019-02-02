const request = require('request');

request({
    url: 'http://www.mapquestapi.com/geocoding/v1/address?key=wDHtLASd5RVoGHXOKFSiX2ORMRpG7Yzd&location=1301%20lombard%20street%20philadelphia',
    json: true
}, (error, response, body) => {
    console.log(`Address: ${body.results[0].providedLocation.location}`);
    console.log(`Latitude: ${body.results[0].locations[0].latLng.lat}`)
    console.log(`Longitutde: ${body.results[0].locations[0].latLng.lng}`)
});