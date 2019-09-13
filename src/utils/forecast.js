const request = require('request')

const forecast = (lat, long, location, callback) => {
    const url = 'https://api.darksky.net/forecast/e0b30032d4ffb585ca6731fe4f15c8bf/'
        + encodeURIComponent(lat) + ',' + encodeURIComponent(long) + '?units=si'

    request({url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect', undefined)
        }
        else if (response.body.error) {
            callback('Bad request', undefined)
        }
        else {
            callback(undefined, {
                temperature: response.body.currently.temperature
            })
        }
    })
}

module.exports = forecast