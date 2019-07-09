const request = require('request')

const getForeCastForCoordinates = (locationInfo, callback) => {
    const urlWeather = `https://api.darksky.net/forecast/9316c9206502046d10a1b5b4ef2d8e10/${locationInfo.longitude},${locationInfo.latitude}?units=si`

    request({url: urlWeather, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service')
        }else if(body.error){
            callback('Unable to find location')
        }
        else{
            const currentData = body.currently
            callback(null, {location: locationInfo.location, forecast: `${body.daily.data[0].summary} It is currently ${currentData.temperature} degrees out. There is a ${currentData.precipProbability}% chance of rain.`})
        }
    })
}

module.exports = getForeCastForCoordinates;