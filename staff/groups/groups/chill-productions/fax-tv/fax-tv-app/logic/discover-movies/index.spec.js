describe('logic - discover movies', () => {
    let name, surname, email, password, id, token

    beforeEach(done => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        call('POST', undefined, 'https://skylabcoders.herokuapp.com/api/user', { name, surname, username: email, password }, result => {
            if (result.error) done(new Error(result.error))
            else {
                call('POST', undefined, 'https://skylabcoders.herokuapp.com/api/auth', { username: email, password }, result => {
                    if (result.error) done(new Error(result.error))
                    else {
                        const { data } = result

                        id = data.id
                        token = data.token

                        done()
                    }
                })
            }
        })
    })

    it('should succeed on correct showing movies', done => {

        discoverMovies(id, token, (error, movies) => {
            expect(error).toBeUndefined()

            expect(movies).toBeDefined()
            expect(movies.length).toBeGreaterThan(0)

            movies.forEach(function (movie) { 
                expect(movie).toBeDefined()
                expect(typeof movie.id).toBe('number')
                
                if(movie.title !== null){
                    expect(movie.title).toBeDefined()
                    expect(typeof movie.title).toBe('string')
                    expect(movie.title.length).toBeGreaterThan(0)
                }
                if(movie.poster_path !== null){
                    expect(movie.poster_path).toBeDefined()
                    expect(typeof movie.poster_path).toBe('string')
                    expect(movie.poster_path.length).toBeGreaterThan(0)
                }
                if(movie.release_date === 'string'){     
                    let a = movie.release_date    
                    expect(movie.release_date).toBeDefined()
                    expect(typeof movie.release_date).toBe('string')
                    expect(movie.release_date.length).toBeGreaterThan(0)
                }
                if(movie.release_date !== null){
                    expect(movie.overview).toBeDefined()
                    expect(typeof movie.overview).toBe('string')
                    expect(movie.overview.length).toBeGreaterThan(0)
                }
                if(movie.vote_average !== null){
                    expect(movie.vote_average).toBeDefined()
                    expect(typeof movie.vote_average).toBe('number')
                }

                expect(movie.isFav).toBeFalsy()
            })

            done()
        })
    })

/*     describe('when fav already exists', () => {
        beforeEach(done => {
            call('PUT', token, `https://skylabcoders.herokuapp.com/api/user/${id}`, { favs: [movieId] }, result => {
                result.error ? done(new Error(result.error)) : done()
            })
        })

        it('should succeed on correct criteria', done => {

            discoverMovies(id, token, (error, movies) => {
                expect(error).toBeUndefined()

                expect(movies).toBeDefined()
                expect(movies.length).toBeGreaterThan(0)

                const hasFav = movies.some(movie => movie.isFav)

                expect(hasFav).toBeTruthy()

                movies.forEach(function (movie) {
                    expect(movie).toBeDefined()
                    expect(typeof movie.id).toBe('string')
                    expect(movie.id.length).toBeGreaterThan(0)

                    expect(movie.title).toBeDefined()
                    expect(typeof movie.title).toBe('string')
                    expect(movie.title.length).toBeGreaterThan(0)

                    expect(movie.image).toBeDefined()
                    expect(typeof movie.image).toBe('string')
                    expect(movie.image.length).toBeGreaterThan(0)

                    expect(movie.price).toBeDefined()
                    expect(typeof movie.price).toBe('string')
                    expect(movie.price.length).toBeGreaterThan(0)

                    movie.id === movieId ? expect(movie.isFav).toBeTruthy() : expect(movie.isFav).toBeFalsy()
                })

                done()
            })
        })
    }) */

})