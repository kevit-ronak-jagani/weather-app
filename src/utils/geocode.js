const { error } = require("console");
const { promises } = require("fs");
const request = require("postman-request")

const axios = require("axios");

const geocode = async (location) => {
    const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?limit=1&access_token=pk.eyJ1Ijoicm9uYWsyMSIsImEiOiJjbGx3ZGVrOW8xamhiM25uejF1aGg5ZjVpIn0.cb5MoW6gavmsOkHJ4860jg`);

    if (response.error) {
        throw new Error("Unable to connect to location services!");
    } else if (!response.data.features) {
        throw new Error("Invalid response from geocoding API.");
    } else if (response.data.features.length === 0) {
        throw new Error("Unable to find location. Try another search.");
    } else {
        return {
            latitude: response.data.features[0].center[1],
            longitude: response.data.features[0].center[0],
            location: response.data.features[0].place_name
        };
    }
};
module.exports = geocode;
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