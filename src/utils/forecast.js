const request = require("postman-request")

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


const forecast = function (latitude, longitude) {
    return new Promise((resolve, reject) => {
        const url = "http://api.weatherstack.com/current?access_key=e1417c2a80b9a9eafadafe5f3df23dc1&query=" + latitude + "," + longitude + "&units=f";

        request({ url, json: true }, (error, { body }) => {
            if (error) {
                reject('Unable to connect to weather service!')
            } else if (body.error) {
                reject('Location not found.')
            } else {
                resolve('It is currently ' + body.current.temperature + ' degrees out. There is a ' + body.current.precip + ' % chance of rain.')
            }
        })
    })
}


module.exports = forecast