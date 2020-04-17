function favoritesList(id, token, callback) {

    validate.string(id)
    validate.string.notVoid('id',id)
    validate.string(token)
    validate.string.notVoid('token',token)
    validate.function(callback)
    let mediaList = []

    call('GET', token, `https://skylabcoders.herokuapp.com/api/user/${id}`, undefined, dataUser => {
        if(dataUser.error) return callback(new Error(dataUser.error))
        
        dataUser.data.favorites.forEach(mediaId => {
            call('GET', undefined,`https://api.themoviedb.org/3/movie/${mediaId}?api_key=6ce203b8e2cd4e788e8a3222ce05dfc8` , undefined, result => {
                if (result.error) return callback(new Error(result.error))

                let path = "https://image.tmdb.org/t/p/original/"
                result.poster_path ? path += result.poster_path : path = "./images/no-poster-image.png"
                result.poster_path = path

                result.isFav = true

                mediaList.push(result)
                callback(undefined, mediaList)
            }) 
        });

        callback(undefined, mediaList)
    })
 
}