describe('logic - retrieve result', function () {
    it('should succeed on correct criteria (query)', function (done) {

        retrieveChampions(function (error, champ) {
            expect(error).toBeUndefined();

            // expect(champs).toBeDefined();
            // expect(champs.length).toBeGreaterThan(0);

                expect(champ).toBeDefined();
                expect(typeof champ.id).toBe('string');
                expect(champ.id.length).toBeGreaterThan(0);

                expect(champ.title).toBeDefined();
                expect(typeof champ.title).toBe('string');
                expect(champ.title.length).toBeGreaterThan(0);

                expect(champ.key).toBeDefined();
                expect(typeof champ.key).toBe('string');
                expect(champ.key.length).toBeGreaterThan(0);

                expect(champ.tag).toBeDefined();
                expect(champ.tag).toEqual(["Mage","Support"]);
                expect(champ.tag.length).toBeGreaterThan(0);
           

            done();
        });
    });

    it('should fail on incorrect criteria', function (done) {
        var query = 'asdfljasdf';

        searchChampion(query, function (error, champs) {
            expect(champs).toBeUndefined();

            expect(error).toBeDefined();

            expect(error.message).toBeDefined();
            expect(typeof error.message).toBe('string');
            expect(error.message.length).toBeGreaterThan(0);

            done();
        });
    });

    it('should fail on incorrect query or expression types', function() {
        expect(function() { searchChampion(1); }).toThrowError(TypeError, '1 is not a string');
        expect(function() { searchChampion(true); }).toThrowError(TypeError, 'true is not a string');
        expect(function() { searchChampion([]); }).toThrowError(TypeError, ' is not a string');
        expect(function() { searchChampion({}); }).toThrowError(TypeError, '[object Object] is not a string');
        expect(function() { searchChampion(undefined); }).toThrowError(TypeError, 'undefined is not a string');
        expect(function() { searchChampion(null); }).toThrowError(TypeError, 'null is not a string');

        expect(function() { searchChampion('red', 1); }).toThrowError(TypeError, '1 is not a function');
        expect(function() { searchChampion('red', true); }).toThrowError(TypeError, 'true is not a function');
        expect(function() { searchChampion('red', []); }).toThrowError(TypeError, ' is not a function');
        expect(function() { searchChampion('red', {}); }).toThrowError(TypeError, '[object Object] is not a function');
        expect(function() { searchChampion('red', undefined); }).toThrowError(TypeError, 'undefined is not a function');
        expect(function() { searchChampion('red', null); }).toThrowError(TypeError, 'null is not a function');
    });
});

describe('logic - retrieve result', function () {
    let name, surname, email, password, id, token, summoner

    beforeEach(done => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`
        summoner = `summoner-${Math.random()}`


        call('POST', undefined, 'https://skylabcoders.herokuapp.com/api/user', { name, surname, summoner, username: email, password },  result => {
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

    it('should succeed on correct criteria (query)', done => {
        const query = 'blue'

        retrieveChampions(id, token, query, (error, result) => {
            expect(error).toBeUndefined()
            result = Object.values(result.data)

            expect(result).toBeDefined()
            expect(result.length).toBeGreaterThan(0)

            result.forEach(function (champ) {
                expect(champ).toBeDefined()
                expect(typeof champ.id).toBe('string')
                expect(champ.id.length).toBeGreaterThan(0)

                expect(champ.title).toBeDefined()
                expect(typeof champ.title).toBe('string')
                expect(champ.title.length).toBeGreaterThan(0)

                expect(champ.image).toBeDefined()
                expect(typeof champ.image).toBe('string')
                expect(champ.image.length).toBeGreaterThan(0)

                expect(champ.price).toBeDefined()
                expect(typeof champ.price).toBe('string')
                expect(champ.price.length).toBeGreaterThan(0)

                expect(champ.isFav).toBeFalsy()
            })

            done()
        })
    })

    describe('when fav already exists', () => {
        beforeEach(done => {
            call('PUT', token, `https://skylabcoders.herokuapp.com/api/user/${id}`, { favs: [champId] }, result => {
                result.error ? done(new Error(result.error)) : done()
            })
        })

        it('should succeed on correct criteria (query)', done => {
            const query = 'a'

            retrieveChampions(id, token, query, (error, result) => {
                expect(error).toBeUndefined()

                expect(result).toBeDefined()
                expect(result.length).toBeGreaterThan(0)

                const hasFav = result.some(champ => champ.isFav)

                expect(hasFav).toBeTruthy()

                result.forEach(function (champ) {
                    expect(champ).toBeDefined()
                    expect(typeof champ.id).toBe('string')
                    expect(champ.id.length).toBeGreaterThan(0)

                    expect(champ.title).toBeDefined()
                    expect(typeof champ.title).toBe('string')
                    expect(champ.title.length).toBeGreaterThan(0)

                    expect(champ.image).toBeDefined()
                    expect(typeof champ.image).toBe('string')
                    expect(champ.image.length).toBeGreaterThan(0)

                    expect(champ.price).toBeDefined()
                    expect(typeof champ.price).toBe('string')
                    expect(champ.price.length).toBeGreaterThan(0)

                    champ.id === champId ? expect(champ.isFav).toBeTruthy() : expect(champ.isFav).toBeFalsy()
                })

                done()
            })
        })
    })

    it('should fail on incorrect criteria', done => {
        const query = 'asdfljasdf'

        retrieveChampions(id, token, query, (error, result) => {
            expect(result).toBeUndefined()

            expect(error).toBeDefined()

            expect(error.message).toBeDefined()
            expect(typeof error.message).toBe('string')
            expect(error.message.length).toBeGreaterThan(0)

            done()
        })
    })

    it('should fail on incorrect query or expression types', () => {
        // TODO cases when id and token have values diff from non-empty string
        
        expect(() => { retrieveChampions(id, token, 1) }).toThrowError(TypeError, '1 is not a string')
        expect(() => { retrieveChampions(id, token, true) }).toThrowError(TypeError, 'true is not a string')
        expect(() => { retrieveChampions(id, token, []) }).toThrowError(TypeError, ' is not a string')
        expect(() => { retrieveChampions(id, token, {}) }).toThrowError(TypeError, '[object Object] is not a string')
        expect(() => { retrieveChampions(id, token, undefined) }).toThrowError(TypeError, 'undefined is not a string')
        expect(() => { retrieveChampions(id, token, null) }).toThrowError(TypeError, 'null is not a string')

        expect(() => { retrieveChampions(id, token, 'red', 1) }).toThrowError(TypeError, '1 is not a function')
        expect(() => { retrieveChampions(id, token, 'red', true) }).toThrowError(TypeError, 'true is not a function')
        expect(() => { retrieveChampions(id, token, 'red', []) }).toThrowError(TypeError, ' is not a function')
        expect(() => { retrieveChampions(id, token, 'red', {}) }).toThrowError(TypeError, '[object Object] is not a function')
        expect(() => { retrieveChampions(id, token, 'red', undefined) }).toThrowError(TypeError, 'undefined is not a function')
        expect(() => { retrieveChampions(id, token, 'red', null) }).toThrowError(TypeError, 'null is not a function')
    })
})