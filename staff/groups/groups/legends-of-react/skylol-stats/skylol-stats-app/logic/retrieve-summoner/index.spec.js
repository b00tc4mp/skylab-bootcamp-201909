describe('logic - retrieve summoner', () => {
    // let summonerName = 'Martita Dinamita'

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
        let summonerName = 'Martita Dinamita'

        retrieveSummoner(summonerName,(error, rank) => {
            expect(error).toBeUndefined()
            

            expect(rank).toBeDefined()
            expect(rank.length).toBeGreaterThan(0)

            
            })

            done()
        })
        it('should succeed on correct criteria (encriptedid)', done => {
            let summonerName = 'Bonnie Mcmurray'
    
            retrieveSummoner(summonerName,(error, rank) => {
                expect(error).toBeUndefined()
                
    
                expect(rank).toBeDefined()
                expect(rank.length).toBeGreaterThan(0)
    
                
                })
    
                done()
            })
    
            it('should fail on incorrect encriptedId', () => {
                expect(() => retrieveSummoner(1)).toThrowError(TypeError, '1 is not a string')
                expect(() => retrieveSummoner(true)).toThrowError(TypeError, 'true is not a string')
                expect(() => retrieveSummoner([])).toThrowError(TypeError, ' is not a string')
                expect(() => retrieveSummoner({})).toThrowError(TypeError, '[object Object] is not a string')
                expect(() => retrieveSummoner(undefined)).toThrowError(TypeError, 'undefined is not a string')
                expect(() => retrieveSummoner(null)).toThrowError(TypeError, 'null is not a string')
        
                // expect(() => retrieveSummoner('')).toThrowError(ContentError, 'summonerName is empty or blank')
                // expect(() => retrieveSummoner(' \t\r')).toThrowError(ContentError, 'summonerName is empty or blank')
        
               
            })
    })

    