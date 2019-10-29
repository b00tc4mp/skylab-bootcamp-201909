describe('logic - retrieve champions', function () {
    it('should succeed on correct criteria (query)', function (done) {

        retrieveChampions(function (error, champ) {
            expect(error).toBeUndefined();

            // expect(champs).toBeDefined();
            // expect(champs.length).toBeGreaterThan(0);
            cjamp
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