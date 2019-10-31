describe('logic - retrieve rank', () => {
    let name, surname, email, password, duckId = '5c3853aebd1bde8520e66e1b'

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

    it('should succeed on correct criteria (id)', done => {
        const query = 'blue'

        retrieveRank(summonerIds.id,(error, rank) => {
            expect(error).toBeUndefined()
            

            expect(rank).toBeDefined()
            expect(rank.length).toBeGreaterThan(0)

            rank.forEach(function (duck) {
                expect(duck).toBeDefined()
                expect(typeof duck.id).toBe('string')
                expect(duck.id.length).toBeGreaterThan(0)

                expect(duck.title).toBeDefined()
                expect(typeof duck.title).toBe('string')
                expect(duck.title.length).toBeGreaterThan(0)

                expect(duck.image).toBeDefined()
                expect(typeof duck.image).toBe('string')
                expect(duck.image.length).toBeGreaterThan(0)

                expect(duck.price).toBeDefined()
                expect(typeof duck.price).toBe('string')
                expect(duck.price.length).toBeGreaterThan(0)

                expect(duck.isFav).toBeFalsy()
            })

            done()
        })
    })

    describe('when fav already exists', () => {
        beforeEach(done => {
            call('PUT', `https://skylabcoders.herokuapp.com/api/user/${id}`, { favs: [duckId] }, result => {
                result.error ? done(new Error(result.error)) : done()
            })
        })

        it('should succeed on correct criteria (id)', done => {
            const query = 'blue'

            retrieveRank( (error, rank) => {
                expect(error).toBeUndefined()

                expect(rank).toBeDefined()
                expect(rank.length).toBeGreaterThan(0)

                const hasFav = rank.some(duck => duck.isFav)

                expect(hasFav).toBeTruthy()

                rank.forEach(function (duck) {
                    expect(duck).toBeDefined()
                    expect(typeof duck.id).toBe('string')
                    expect(duck.id.length).toBeGreaterThan(0)

                    expect(duck.title).toBeDefined()
                    expect(typeof duck.title).toBe('string')
                    expect(duck.title.length).toBeGreaterThan(0)

                    expect(duck.image).toBeDefined()
                    expect(typeof duck.image).toBe('string')
                    expect(duck.image.length).toBeGreaterThan(0)

                    expect(duck.price).toBeDefined()
                    expect(typeof duck.price).toBe('string')
                    expect(duck.price.length).toBeGreaterThan(0)

                    duck.id === duckId ? expect(duck.isFav).toBeTruthy() : expect(duck.isFav).toBeFalsy()
                })

                done()
            })
        })
    })

    it('should fail on incorrect criteria', done => {
        const id = 'asdfljasdf'

        retrieveRank(id,(error, rank) => {
            expect(rank).toBeUndefined()

            expect(error).toBeDefined()

            expect(error.message).toBeDefined()
            expect(typeof error.message).toBe('string')
            expect(error.message.length).toBeGreaterThan(0)

            done()
        })
    })

    it('should fail on incorrect query or expression types', () => {
        // TODO cases when id and token have values diff from non-empty string
        
        expect(() => { retrieveRank(1) }).toThrowError(TypeError, '1 is not a string')
        expect(() => { retrieveRank(true) }).toThrowError(TypeError, 'true is not a string')
        expect(() => { retrieveRank([]) }).toThrowError(TypeError, ' is not a string')
        expect(() => { retrieveRank({}) }).toThrowError(TypeError, '[object Object] is not a string')
        expect(() => { retrieveRank(undefined) }).toThrowError(TypeError, 'undefined is not a string')
        expect(() => { retrieveRank(null) }).toThrowError(TypeError, 'null is not a string')

        expect(() => { retrieveRank('red', 1) }).toThrowError(TypeError, '1 is not a function')
        expect(() => { retrieveRank('red', true) }).toThrowError(TypeError, 'true is not a function')
        expect(() => { retrieveRank('red', []) }).toThrowError(TypeError, ' is not a function')
        expect(() => { retrieveRank('red', {}) }).toThrowError(TypeError, '[object Object] is not a function')
        expect(() => { retrieveRank('red', undefined) }).toThrowError(TypeError, 'undefined is not a function')
        expect(() => { retrieveRank('red', null) }).toThrowError(TypeError, 'null is not a function')
    })
})