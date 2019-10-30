const motherlink = "http://ddragon.leagueoflegends.com/cdn/9.21.1/data/en_US/champion.json"

fetch(motherlink).then(r => r.json())
console.log(data)


fetch("http://ddragon.leagueoflegends.com/cdn/9.21.1/data/en_US/champion.json").then(r => r.json())
.then(data => console.log(data))
.catch(e => console.log("Booo"))