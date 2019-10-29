const motherlink = "http://ddragon.leagueoflegends.com/cdn/9.21.1/data/en_US/champion.json"


function openJSON(link,callback){

    var xhr = new XMLHttpRequest;
    
    xhr.open('GET', link);
    
    xhr.onreadystatechange = function () {
        var r = JSON.parse(this.responseText); 
        callback(r.data)
    };
    xhr.send();
}


let a
openJSON(motherlink,result => a = result)

function listChamps(result){
    let champArray = []
    for(var key in result) {
        champArray.push([key.name,key.tags,'https://ddragon.leagueoflegends.com/cdn/9.13.1/img/champion/'+key.name+'.png','http://ddragon.leagueoflegends.com/cdn/9.21.1/data/en_US/champion/'+key.name+'.json'])
    }
    return champArray
    }