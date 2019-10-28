var misCabeceras = new Headers();
var miInit = { method: 'GET',
             headers: {},
             cache: 'default' };
fetch('https://skylabcoders.herokuapp.com/proxy?url=https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/_WiUZj3QaaFGq-Ioj073fHaiAUNRZibJHqZXxDGk78_s2kc?api_key=RGAPI-b5fe0dc5-c06d-4162-b5fa-1c40d3453f75',miInit)
.then(function(response) {
return response.text();
})