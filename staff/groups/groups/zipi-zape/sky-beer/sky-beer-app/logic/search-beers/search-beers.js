function searchBeers (query, callback) {
    if(typeof query !== 'string') throw error = new Error (TypeError, `${query} is not a string`)
    if(typeof callback !== 'function') throw error = new Error (TypeError, `${query} is not a function`)
    call('GET', `https://api.punkapi.com/v2/beers?${query}`, undefined, undefined, results => {
        results.error ? callback (error) : callback(undefined,error)
    })

}