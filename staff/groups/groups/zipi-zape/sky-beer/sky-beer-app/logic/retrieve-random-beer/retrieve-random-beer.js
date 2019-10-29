function retrieveRandomBeer (callback) {
    
   //do {
        call ('GET', 'https://api.punkapi.com/v2/beers/random',undefined, undefined, (result) => {
            if (result.error) callback (new Error(result.error))
            else {
                if (result[0].image_url === null) result[0].image_url = './img/noimage.png'
                callback(undefined,result[0])
            }
        })
    //    let {id, name, imageUrl, tagline} = result
   //} while (!(id && name && imageUrl && tagline))
   

}