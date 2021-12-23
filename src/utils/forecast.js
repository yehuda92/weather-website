const request = require('request')
const testMsg = "This msg was created to practis on github and heroku" 
const testMsgTwo = "This msg was created to practis on github and heroku" 


const forecast = (latitude, longitude, callback) => {
   const url = 'http://api.weatherstack.com/current?access_key=e372ce6dfa3243a66ca49e8cd1c7a062&query='+ latitude + ',' + longitude +'&unit=f'

    request({url, json: true}, (err, {body}) => {
        if(err) {
            callback('Unable to conect to Weather service!', undefined)
        } else if(body.error) {
            callback('Unable to find location!' +  testMsg + testMsgTwo, undefined)
        } else {
            callback(undefined, {
                current: body.current.weather_descriptions,
                temparature: body.current.temperature,
                feelslike: body.current.feelslike
            })
        }
    })
}

module.exports = forecast