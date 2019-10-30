function searchBeers (query, callback) {
    if(typeof query !== 'string') throw new TypeError (`${query} is not a string`)
    if(typeof callback !== 'function') throw new TypeError (`${callback} is not a function`)

    call('GET', `https://api.punkapi.com/v2/beers?${query}`, undefined, undefined, results => {
        if (results.error) callback (error)
        else { if (result[0].image_url === null) result[0].image_url = './img/noimage.png'
               callback(undefined,results)
        }
    })

}