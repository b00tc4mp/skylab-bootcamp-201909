function championKey (masteries, champions){ /* champions es array de objecto de campeones*/
    
    for (let i =0; i<masteries.length;i++){
        for (let j=0; j<champions.length;j++){
            if (masteries[i].championId === champions[j].key){
                masteries[i].image = `http://ddragon.leagueoflegends.com/cdn/9.21.1/img/champion/${champions[j].image.full}`
                masteries[i].name = champions[j].name
            }
        }
    }
    return masteries

}