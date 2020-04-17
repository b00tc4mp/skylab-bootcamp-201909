describe('logic - retrieve show', () => {
    let name, surname, email, password, id, token, show_id = 23

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

    it('should succeed on correct show id', done => {
        retrieveTvShow(id, token, show_id, (error, show) => {
            expect(error).toBeUndefined()

            expect(show).toBeDefined()
           
            expect(typeof show.id).toBe('number')
            
            if(show.name !== null){
                expect(show.name).toBeDefined()
                expect(typeof show.name).toBe('string')
                expect(show.name.length).toBeGreaterThan(0)
            }
            if(show.poster_path !== null){
                expect(show.poster_path).toBeDefined()
                expect(typeof show.poster_path).toBe('string')
                expect(show.poster_path.length).toBeGreaterThan(0)
            }
            if(show.first_air_date === 'string'){     
                let a = show.first_air_date    
                expect(show.first_air_date).toBeDefined()
                expect(typeof show.first_air_date).toBe('string')
                expect(show.first_air_date.length).toBeGreaterThan(0)
            }
            if(show.first_air_date !== null){
                expect(show.overview).toBeDefined()
                expect(typeof show.overview).toBe('string')
                expect(show.overview.length).toBeGreaterThan(0)
            }
            if(show.vote_average !== null){
                expect(show.vote_average).toBeDefined()
                expect(typeof show.vote_average).toBe('number')
            }

            expect(show.isFav).toBeDefined()

            done()
        })
    })

/*     describe('when fav already exists', () => {
        beforeEach(done => {
            call('PUT', token, `https://skylabcoders.herokuapp.com/api/user/${id}`, { favs: [show_id] }, result => {
                result.error ? done(new Error(result.error)) : done()
            })
        })

        it('should succeed on correct show id', done => {
            retrieveTvShow(id, token, show_id, (error, show) => {
                expect(error).toBeUndefined()
    
                expect(show).toBeDefined()
                expect(show.id).toBe(show_id)
    
                expect(show.name).toBeDefined()
                expect(typeof show.name).toBe('string')
                expect(show.name.length).toBeGreaterThan(0)
    
                expect(show.image).toBeDefined()
                expect(typeof show.image).toBe('string')
                expect(show.image.length).toBeGreaterThan(0)
    
                expect(show.description).toBeDefined()
                expect(typeof show.description).toBe('string')
                expect(show.description.length).toBeGreaterThan(0)
    
                expect(show.link).toBeDefined()
                expect(typeof show.link).toBe('string')
                expect(show.link.length).toBeGreaterThan(0)
    
                expect(show.price).toBeDefined()
                expect(typeof show.price).toBe('string')
                expect(show.price.length).toBeGreaterThan(0)
    
                expect(show.isFav).toBeTruthy()
    
                done()
            })
        })
    }) */

    it('should fail on incorrect show id', done => {
        const wrongshow_id = 123456789

        retrieveTvShow(id, token, wrongshow_id, (error, show) => {
            
            expect(error).toBeUndefined()
            expect(show).toBeDefined()
            expect(show.status_code).toEqual(34)

            done()
        })
    })

    it('should fail on incorrect id or expression types', () => { 
 
        expect(() => { retrieveTvShow(id, token, 'abc') }).toThrowError(TypeError, 'abc is not a number')
        expect(() => { retrieveTvShow(id, token, true) }).toThrowError(TypeError, 'true is not a number')
        expect(() => { retrieveTvShow(id, token, []) }).toThrowError(TypeError, ' is not a number')
        expect(() => { retrieveTvShow(id, token, {}) }).toThrowError(TypeError, '[object Object] is not a number')
        expect(() => { retrieveTvShow(id, token, undefined) }).toThrowError(TypeError, 'undefined is not a number')
        expect(() => { retrieveTvShow(id, token, null) }).toThrowError(TypeError, 'null is not a number') 

        expect(() => { retrieveTvShow(id, token, 550, 1) }).toThrowError(TypeError, '1 is not a function')
        expect(() => { retrieveTvShow(id, token, 550, true) }).toThrowError(TypeError, 'true is not a function')
        expect(() => { retrieveTvShow(id, token, 550, []) }).toThrowError(TypeError, ' is not a function')
        expect(() => { retrieveTvShow(id, token, 550, {}) }).toThrowError(TypeError, '[object Object] is not a function')
        expect(() => { retrieveTvShow(id, token, 550, undefined) }).toThrowError(TypeError, 'undefined is not a function')
        expect(() => { retrieveTvShow(id, token, 550, null) }).toThrowError(TypeError, 'null is not a function')
    })
})