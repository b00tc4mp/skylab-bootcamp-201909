describe('Pop', function () {
    it('should delete the last element', function () {
        var hooray = new Hooray(1, 2, 3);

        expect(hooray.pop()).toBe(3);
        expect(hooray[hooray.length - 1]).toBe(2);

        var chars = [1, 2];
        for (var i = 0; i < chars.length; i++)
            expect(hooray[i]).toBe(chars[i]);
    });

});