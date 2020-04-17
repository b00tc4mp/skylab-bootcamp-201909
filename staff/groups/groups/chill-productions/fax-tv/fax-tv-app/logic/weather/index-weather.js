/**Function that return Json of info to API weather
 * @param {number} latitude latitude of city
 * @param {number} longitude longitude of city
 * @return {Object} Json whit the info of API
 */

function getWeather(latitude, longitude, callback){ 

    if(latitude === undefined) latitude = 41.398679
    if(longitude === undefined) longitude = 2.199960

    validate.function(callback)

    const url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/1e9b9ef424d5f6d6b566e721f59a45aa/${latitude},${longitude}`
    
    call('GET', undefined, url, undefined, result => { 
        if (result.error) return callback(new Error(result.error))

        callback(undefined, result.currently)
    })
}