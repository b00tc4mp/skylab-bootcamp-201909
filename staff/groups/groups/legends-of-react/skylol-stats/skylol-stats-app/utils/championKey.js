/**
 * Returns the first array of objects, with a couple of properties per object added, obtained by another array of objects, through a matching key.
 * 
 * @param {masteries} array Array full of Objects with properties to be added.
 * @param {champions} array Array with Objects with properties to be obtained from.
 * */

function championKey (masteries, champions){ 
    debugger
    for (let i =0; i<masteries.length;i++){
        for (let j=0; j<champions.length;j++){
            if ((masteries[i].championId).toString() === champions[j].key){
                masteries[i].image = `http://ddragon.leagueoflegends.com/cdn/9.21.1/img/champion/${champions[j].image.full}`
                masteries[i].name = champions[j].name
            }
        }
    }
    return masteries

}