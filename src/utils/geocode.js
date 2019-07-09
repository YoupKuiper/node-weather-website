const request = require('request')

const getCoordinatesForLocation = (location, callback) => {
    const urlLocation = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoieW91cGt1aXBlciIsImEiOiJjanhuOWNmMHkwMm9wM3BwOGRtbGg4aWZwIn0.PZkyUJ2Q0OkQq4IeRfJK9A&limit=1`
    request({url: urlLocation, json: true}, (error, response) => {
        if(error){
            callback('Could not connect to location service')
        }
        else if(response.body.features.length < 1){
            callback('Location not found')
        }else{
            callback(null, response.body)
        }
    })
}

module.exports = getCoordinatesForLocation;