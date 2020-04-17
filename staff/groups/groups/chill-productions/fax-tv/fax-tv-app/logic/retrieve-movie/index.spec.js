describe('logic - retrieve movie', () => {
    let name, surname, email, password, id, token, movie_id = 550

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

    it('should succeed on correct movie id', done => {
        retrieveMovie(id, token, movie_id, (error, movie) => {
            expect(error).toBeUndefined()

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

            expect(movie.isFav).toBeDefined()

            done()
        })
    })

/*     describe('when fav already exists', () => {
        beforeEach(done => {
            call('PUT', token, `https://skylabcoders.herokuapp.com/api/user/${id}`, { favs: [movie_id] }, result => {
                result.error ? done(new Error(result.error)) : done()
            })
        })

        it('should succeed on correct movie id', done => {
            retrieveMovie(id, token, movie_id, (error, movie) => {
                expect(error).toBeUndefined()
    
                expect(movie).toBeDefined()
                expect(movie.id).toBe(movie_id)
    
                expect(movie.title).toBeDefined()
                expect(typeof movie.title).toBe('string')
                expect(movie.title.length).toBeGreaterThan(0)
    
                expect(movie.image).toBeDefined()
                expect(typeof movie.image).toBe('string')
                expect(movie.image.length).toBeGreaterThan(0)
    
                expect(movie.description).toBeDefined()
                expect(typeof movie.description).toBe('string')
                expect(movie.description.length).toBeGreaterThan(0)
    
                expect(movie.link).toBeDefined()
                expect(typeof movie.link).toBe('string')
                expect(movie.link.length).toBeGreaterThan(0)
    
                expect(movie.price).toBeDefined()
                expect(typeof movie.price).toBe('string')
                expect(movie.price.length).toBeGreaterThan(0)
    
                expect(movie.isFav).toBeTruthy()
    
                done()
            })
        })
    }) */

    it('should fail on incorrect movie id', done => {
        const wrongmovie_id = 123456789

        retrieveMovie(id, token, wrongmovie_id, (error, movie) => {
            
            expect(error).toBeUndefined()
            expect(movie).toBeDefined()
            expect(movie.status_code).toEqual(34)

            done()
        })
    })

    it('should fail on incorrect id or expression types', () => { 
 
        expect(() => { retrieveMovie(id, token, 'abc') }).toThrowError(TypeError, 'abc is not a number')
        expect(() => { retrieveMovie(id, token, true) }).toThrowError(TypeError, 'true is not a number')
        expect(() => { retrieveMovie(id, token, []) }).toThrowError(TypeError, ' is not a number')
        expect(() => { retrieveMovie(id, token, {}) }).toThrowError(TypeError, '[object Object] is not a number')
        expect(() => { retrieveMovie(id, token, undefined) }).toThrowError(TypeError, 'undefined is not a number')
        expect(() => { retrieveMovie(id, token, null) }).toThrowError(TypeError, 'null is not a number') 

        expect(() => { retrieveMovie(id, token, 550, 1) }).toThrowError(TypeError, '1 is not a function')
        expect(() => { retrieveMovie(id, token, 550, true) }).toThrowError(TypeError, 'true is not a function')
        expect(() => { retrieveMovie(id, token, 550, []) }).toThrowError(TypeError, ' is not a function')
        expect(() => { retrieveMovie(id, token, 550, {}) }).toThrowError(TypeError, '[object Object] is not a function')
        expect(() => { retrieveMovie(id, token, 550, undefined) }).toThrowError(TypeError, 'undefined is not a function')
        expect(() => { retrieveMovie(id, token, 550, null) }).toThrowError(TypeError, 'null is not a function')
    })
})