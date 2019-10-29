function retrieveRandomBeer (callback) {
    
   //do {
        call ('GET', 'https://api.punkapi.com/v2/beers/random',undefined, undefined, (result) => {
            if (result.error) callback (new Error(result.error))
            else callback(undefined,result[0])
        })
    //    let {id, name, imageUrl, tagline} = result
   //} while (!(id && name && imageUrl && tagline))
   

}