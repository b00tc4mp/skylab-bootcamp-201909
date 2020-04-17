function discoverMovies(id, token, callback) { 
    validate.string(id)
    validate.string.notVoid('id',id)
    validate.string(token)
    validate.string.notVoid('token',token)
    validate.function(callback)

    const url = 'https://api.themoviedb.org/3/discover/movie?api_key=6ce203b8e2cd4e788e8a3222ce05dfc8&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1'
    
    call('GET', undefined, url, undefined, result => {
        if (result.errors) return callback(new Error(result.errors))

        call('GET', token, `https://skylabcoders.herokuapp.com/api/user/${id}`, undefined, result2 => {
            if (result2.error) return callback(new Error(result2.error))

            const { data: { favorites = [] } } = result2

            result.results.forEach(movie => {
                let path = "https://image.tmdb.org/t/p/original/"
                movie.poster_path ? path += movie.poster_path : path = "./images/no-poster-image.png"  
                movie.poster_path = path
                movie.isFav = favorites.includes(movie.id)
            }) 

            callback(undefined, result.results)
        })
    })
}