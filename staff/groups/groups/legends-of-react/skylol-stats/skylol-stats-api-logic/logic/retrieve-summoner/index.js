function retrieveSummoner(query, callback) {
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

    call('GET', undefined,'http://ddragon.leagueoflegends.com/cdn/9.21.1/data/en_US/champion.json', undefined, function (result) {
        if (result.error)
            callback(new Error(result.error))
        // else{

        //     }
        callback(undefined, result.text())
            
        }
        
)};



https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/Bonnie%20Mcmurray

https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/_WiUZj3QaaFGq-Ioj073fHaiAUNRZibJHqZXxDGk78_s2kc

var miInit = { method: 'GET',
headers: {},
cache: 'default' };



fetch('https://skylabcoders.herokuapp.com/proxy?url=https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/_WiUZj3QaaFGq-Ioj073fHaiAUNRZibJHqZXxDGk78_s2kc?api_key=RGAPI-b5fe0dc5-c06d-4162-b5fa-1c40d3453f75',miInit)
.then(function(response) {
return response.text();
})