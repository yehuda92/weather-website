const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + 
    '.json?access_token=pk.eyJ1IjoieWVodWRhOTIiLCJhIjoiY2t3eG1ianM5MGVpbzJ4bGFienVoYnV4biJ9._8qqwQQPX58dwuBEB4_hpw'
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to conect to location services!', undefined)
        } else if(body.features.length === 0) {
            callback('Unable to find to location services try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode