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