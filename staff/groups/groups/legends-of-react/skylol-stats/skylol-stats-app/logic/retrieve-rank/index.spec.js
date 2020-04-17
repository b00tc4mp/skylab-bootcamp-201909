describe('logic - retrieve rank', () => {
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

        retrieveRank(encriptedId,(error, rank) => {
            expect(error).toBeUndefined()
            

            expect(rank).toBeDefined()
            expect(rank.length).toBeGreaterThan(0)

            
            })

            done()
        })
        it('should succeed on correct criteria (encriptedid)', done => {
            let encriptedId = 'g5xF38YVZ5xMPD5NCRkkRo8QNMqlofULtcbyOjbEkVXJw6c'
    
            retrieveRank(encriptedId,(error, rank) => {
                expect(error).toBeUndefined()
                
    
                expect(rank).toBeDefined()
                expect(rank.length).toBeGreaterThan(0)
    
                
                })
    
                done()
            })
    
            it('should fail on incorrect encriptedId', () => {
                expect(() => retrieveRank(1)).toThrowError(TypeError, '1 is not a string')
                expect(() => retrieveRank(true)).toThrowError(TypeError, 'true is not a string')
                expect(() => retrieveRank([])).toThrowError(TypeError, ' is not a string')
                expect(() => retrieveRank({})).toThrowError(TypeError, '[object Object] is not a string')
                expect(() => retrieveRank(undefined)).toThrowError(TypeError, 'undefined is not a string')
                expect(() => retrieveRank(null)).toThrowError(TypeError, 'null is not a string')
        
                // expect(() => retrieveRank('')).toThrowError(ContentError, 'encriptedId is empty or blank')
                // expect(() => retrieveRank(' \t\r')).toThrowError(ContentError, 'encriptedId is empty or blank')
        
               
            })
    })

    