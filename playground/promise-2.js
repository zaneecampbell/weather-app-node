const request = require('request');

const geocodeAddress = (address) => {

    return new Promise((resolve, reject) => {
        const encodedAddress = encodeURIComponent(address);

        request({
            url: `http://www.mapquestapi.com/geocoding/v1/address?key=wDHtLASd5RVoGHXOKFSiX2ORMRpG7Yzd&location=${encodedAddress}`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Unable to connect to servers');
            } else if (!body) {
                reject('Unable to find that address');
            } else if (body) {
                resolve({
                    address: body.results[0].providedLocation.location,
                    latitude: body.results[0].locations[0].latLng.lat,
                    longitude: body.results[0].locations[0].latLng.lng
                });
            }
        });

    });
};

geocodeAddress('98275').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
});

// request({
//     url: `http://www.mapquestapi.com/geocoding/v1/address?key=wDHtLASd5RVoGHXOKFSiX2ORMRpG7Yzd&location=${encodedAddress}`,
//     json: true
// }, (error, response, body) => {
//     if (error) {
//         callback('Unable to connect to servers')
//     } else if (!body) {
//         callback('Unable to find that address');
//     } else if (body) {
//         callback(undefined, {
//             address: body.results[0].providedLocation.location,
//             latitude: body.results[0].locations[0].latLng.lat,
//             longitude: body.results[0].locations[0].latLng.lng
//         });
//     }
// });