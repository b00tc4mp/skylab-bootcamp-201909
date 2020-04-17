function retrieveMovie(id, token, movie_id, callback) {

    validate.string(id)
    validate.string.notVoid('id',id)
    validate.string(token)
    validate.string.notVoid('token',token)
    validate.number(movie_id)
    validate.function(callback)
    

  
    call('GET', undefined,`https://api.themoviedb.org/3/movie/${movie_id}?api_key=6ce203b8e2cd4e788e8a3222ce05dfc8` , undefined, result => {
        if (result.error) return callback(new Error(result.error))

        call('GET', token, `https://skylabcoders.herokuapp.com/api/user/${id}`, undefined, result2 => {
            if (result2.error) return callback(new Error(result2.error))

            let path = "https://image.tmdb.org/t/p/original/"
            result.poster_path ? path += result.poster_path : path = "./images/no-poster-image.png" 
            result.poster_path = path


            const { data: { favorites = [] } } = result2
            const { title, overview, poster_path, runtime, release_date, vote_average, id } = result
            result.isFav = favorites.includes(result.id)


            // callback(undefined, {title, overview, poster_path, runtime, release_date, vote_average, isFav })

            callback(undefined, result)

        
        
        })
    })
}

