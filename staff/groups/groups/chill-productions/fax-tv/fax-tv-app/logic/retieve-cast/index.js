function retrieveCast(id, token, movie_id, callback) {

    validate.string(id)
    validate.string.notVoid('id',id)
    validate.string(token)
    validate.string.notVoid('token',token)
    validate.number(movie_id)
    validate.function(callback)
    
    call('GET', undefined,`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=6ce203b8e2cd4e788e8a3222ce05dfc8` , undefined, result => {
        if (result.error) return callback(new Error(result.error))


    })


}