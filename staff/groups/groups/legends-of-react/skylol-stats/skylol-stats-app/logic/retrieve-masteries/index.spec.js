describe('logic - retrieve masteries', () => {
    let encriptedId = '_WiUZj3QaaFGq-Ioj073fHaiAUNRZibJHqZXxDGk78_s2kc'

    // beforeEach(done => {
    //     name = `name-${Math.random()}`
    //     surname = `surname-${Math.random()}`
    //     email = `email-${Math.random()}@mail.com`
    //     password = `password-${Math.random()}`

    //     call('POST', undefined, 'https://skylabcoders.herokuapp.com/api/user', { name, surname, username: email, password }, result => {
    //         if (result.error) done(new Error(result.error))
    //         else {
    //             call('POST', undefined, 'https://skylabcoders.herokuapp.com/api/auth', { username: email, password }, result => {
    //                 if (result.error) done(new Error(result.error))
    //                 else {
    //                     const { data } = result

    //                     id = data.id
    //                     token = data.token

    //                     done()
    //                 }
    //             })
    //         }
    //     })
    // })

    it('should succeed on correct criteria (id)', done => {
        let encriptedId = '_WiUZj3QaaFGq-Ioj073fHaiAUNRZibJHqZXxDGk78_s2kc'

        retrieveMasteries(encriptedId,(error, rank) => {
            expect(error).toBeUndefined()
            

            expect(rank).toBeDefined()
            expect(rank.length).toBeGreaterThan(0)

            
            })

            done()
        })
    

    it('should succeed on correct criteria (encriptedid)', done => {
        let encriptedId = '7d9xDbuTVx34PEoKNJQdePOe0l1pEK2QNMJipu45J8zIlrI'

        retrieveMasteries(encriptedId,(error, rank) => {
            expect(error).toBeUndefined()
            

            expect(rank).toBeDefined()
            expect(rank.length).toBeGreaterThan(0)

            
            })

            done()
        })
    it('should succeed on correct criteria (encriptedid)', done => {
        let encriptedId = 'g5xF38YVZ5xMPD5NCRkkRo8QNMqlofULtcbyOjbEkVXJw6c'

        retrieveMasteries(encriptedId,(error, rank) => {
            expect(error).toBeUndefined()
            

            expect(rank).toBeDefined()
            expect(rank.length).toBeGreaterThan(0)

            
            })

            done()
        })

    it('should fail on incorrect encriptedId', () => {
        expect(() => retrieveMasteries(1)).toThrowError(TypeError, '1 is not a string')
        expect(() => retrieveMasteries(true)).toThrowError(TypeError, 'true is not a string')
        expect(() => retrieveMasteries([])).toThrowError(TypeError, ' is not a string')
        expect(() => retrieveMasteries({})).toThrowError(TypeError, '[object Object] is not a string')
        expect(() => retrieveMasteries(undefined)).toThrowError(TypeError, 'undefined is not a string')
        expect(() => retrieveMasteries(null)).toThrowError(TypeError, 'null is not a string')

        // expect(() => retrieveMasteries('')).toThrowError(ContentError, 'encriptedId is empty or blank')
        // expect(() => retrieveMasteries(' \t\r')).toThrowError(ContentError, 'encriptedId is empty or blank')

        
        })

    })

    