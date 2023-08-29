const request = require("postman-request")
const axios = require("axios");

const forecast = async (latitude, longitude) => {
    const response = await axios.get(`http://api.weatherstack.com/current?access_key=d92884d88fdaa681d2b6f6a0415faf94&query=${latitude},${longitude}&units=m`);

    if (response.error) {
        throw new Error('Unable to connect to weather service!');
    } else if (response.data.error) {
        throw new Error('Location not found.');
    } else {
        return `It is currently ${response.data.current.temperature} Celsius degrees out. There is a ${response.data.current.precip} % chance of rain. Wind speed is ${response.data.current.wind_speed} KMPH. and Humidity is ${response.data.current.humidity}%`;
    }
};
module.exports = forecast
// const forecast = (latitude, longitude, callback) => {
//     const url = "http://api.weatherstack.com/current?access_key=e1417c2a80b9a9eafadafe5f3df23dc1&query=" + latitude + "," + longitude + "&units=f";

//     request({ url: url, json: true }, (error, response) => {
//         if (error) {
//             callback('Unable to connect to weather service!', undefined)
//         } else if (response.body.error) {
//             callback('Location not found.', undefined)
//         } else {
//             callback(undefined, 'It is currently ' + response.body.current.temperature + ' degrees out. There is a ' + response.body.current.precip + ' % chance of rain.')
//         }
//     })
// }