const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +  '.json?types=address&access_token=pk.eyJ1IjoibW9oYW1lZGF0dGEiLCJhIjoiY2swMmR2dnJiMXgwaTNsa2l6bml4Nm42aSJ9.bArc-zm4ItxhnRFUr5t2wA&limit=1';

    request({url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect', undefined)
        }
        else if (response.body.message) {
            callback('no results', undefined)
        }
        else {
            callback(undefined, {
                lat: response.body.features[0].center[1],
                long: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode