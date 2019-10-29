function retrieveBeer (id, callback)  {

    if (typeof id !== 'number') throw new TypeError (`${id} is not a number`)
    if (typeof callback !== 'function') throw new TypeError (`${callback} is not a function`)

    call('GET', `https://api.punkapi.com/v2/beers/${id}`, undefined, undefined, result => {
        if (results.error) callback (result.error)
        else { if (result[0].image_url === null) result[0].image_url = './img/noimage.png'
              callback(undefined,result[0])
        }
    })
}   