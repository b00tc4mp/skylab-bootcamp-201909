function retrieveDuck(id, callback) { // 16. pq hace este callback ? para que nosotrosos podemos hacer lo que nos da la gana para procesar estas informaciones => es te retrieveDuck va a result-item.js
    
    call('GET', 'https://duckling-api.herokuapp.com/api/ducks/' + id, callback); 
}

//  15. representa un call especial