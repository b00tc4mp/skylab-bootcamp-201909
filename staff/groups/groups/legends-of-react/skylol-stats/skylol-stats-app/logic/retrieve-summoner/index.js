/**
 * Retrieves a specific summoner (player) of league of legends
 * 
 * @param {String} query the input introduced to the search form, that matches with the summoner name
 * @param {Expression} callback Expression that will return results
 * 
 * @returns {Object} returns an object with information of a specific league of legends player (summoner)
 */

function retrieveSummoner(query, callback){
    validate.string(query)
    validate.string.notVoid('query', query)
    validate.function(callback)

    query=query.split(' ').join('%20')

    call('GET', undefined,'https://skylabcoders.herokuapp.com/proxy?url=https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + query+'?api_key='+ APIKEY, undefined, function (result) {


        if (result.status){
            callback(new Error(result.status.message))
        }else{
            callback(undefined, result)
        }           
        }       
)};

