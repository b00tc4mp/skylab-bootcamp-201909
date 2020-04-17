describe('logic - Toggle Favorite', () => {
    let name, surname, email, password, id, token, favorites, movieId = 420809

    beforeEach(done => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`
        favorites = []

        call('POST', undefined, 'https://skylabcoders.herokuapp.com/api/user', { name, surname, username: email, password, favorites }, result => {
            if (result.error) done(new Error(result.error))
            else {
                call('POST', undefined, 'https://skylabcoders.herokuapp.com/api/auth', { username: email, password }, result => {
                    if (result.error) done(new Error(result.error))
                    else {
                        const { data } = result

                        id = data.id
                        token = data.token

                        call('GET', token, `https://skylabcoders.herokuapp.com/api/user/${id}`, undefined, result => {
                            if (result.error) return done(new Error(result.error))
                            
                            let favs = result.data.favorites
                            favs.push(movieId)
                            toggleFav(id, token, { favorites: favs }, (error, result) => {
                                 
                                if (result.error) return done(new Error(result.error))
                                
                                done()
                            })
                            
                        })
                    }
                })
            }
        })
    })

    it('should succeed on correct favorites update', done => {
        retrieveUser(id, token, (error, data) => {
            expect(error).toBeUndefined()

            expect(data).toBeDefined()
            expect(data.name).toBe(name)
            expect(data.surname).toBe(surname)
            expect(data.username).toBe(email)
            expect(data.favorites.length).toBe(1)
            expect(data.favorites).toEqual([movieId])
            expect(data.password).toBeUndefined()

            done()
        })
    })

})