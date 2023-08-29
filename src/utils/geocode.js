const { error } = require("console");
const { promises } = require("fs");
const request = require("postman-request")

// const geocode =  (location, callback) => {
//     const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + location + ".json?limit=1&access_token=pk.eyJ1Ijoicm9uYWsyMSIsImEiOiJjbGxxOGczMnAwYzBqM3VucmwzaWFvamxtIn0.ONgiQUPf1tAOCDzxNC5xSg";

//     request({ url: url, json: true }, (error, response) => {
//         if (error) {
//             callback('Unable to connect to location services!', undefined)
//         } else if (response.body.features.length === 0) {
//             callback('Unable to find location. Try another search.', undefined)
//         } else {
//             callback("No error", {
//                 latitude: response.body.features[0].center[0],
//                 longitude: response.body.features[0].center[1],
//                 location: response.body.features[0].place_name
//             })
//         }
//     })
// }
const geocode = function (location) {
    return new Promise((resolve, reject) => {
        const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + location + ".json?limit=1&access_token=pk.eyJ1Ijoicm9uYWsyMSIsImEiOiJjbGxxOGczMnAwYzBqM3VucmwzaWFvamxtIn0.ONgiQUPf1tAOCDzxNC5xSg";

        request({ url: url, json: true }, (error, { body }) => {
            console.log(body);
            if (error) {
                reject('Unable to connect to location services!')
            }
            else if (!body.features) {
                reject('Provide valid address')
            } else {
                resolve({
                    latitude: body.features[0].center[0],
                    longitude: body.features[0].center[1],
                    location: body.features[0].place_name
                })
            }
        })
    })
}


module.exports = geocode;