function searchMovies(id, token, query, typeMedia, callback) { 
    validate.string(id)
    validate.string.notVoid('id',id)
    validate.string(token)
    validate.string.notVoid('token',token)
    validate.string(query)
    validate.string.notVoid('query',query)
    validate.string(typeMedia)
    validate.string.notVoid('typeMedia',typeMedia)
    validate.function(callback)
    
    let url
    if (typeMedia === "movies") {
        url = 'https://api.themoviedb.org/3/search/movie?api_key=6ce203b8e2cd4e788e8a3222ce05dfc8&query=' + query
    } else {
        url = 'https://api.themoviedb.org/3/search/tv?api_key=6ce203b8e2cd4e788e8a3222ce05dfc8&language=en-US&page=1&query=' + query
    }

    call('GET', undefined, url, undefined, result => {
        if (result.error) return callback(new Error(result.error))

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