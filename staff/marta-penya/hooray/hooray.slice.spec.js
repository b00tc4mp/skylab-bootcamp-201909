describe('Hooray.prototype.slice', function() {
    it('should return a new hooray with the values in the given limits', function() {
        var numbers = new Hooray(1, 2, 3, 4, 5, 6, 7, 8, 9);

        var result = numbers.slice(3, 7);

        expect(result).not.toBe(numbers);
        expect(numbers).toContain(1, 2, 3, 4, 5, 6, 7, 8, 9);
        expect(result).toContain(4, 5, 6, 7);
    });

     it('should return a new hooray with the values in from the beginning (no ending)', function() {
        var numbers = new Hooray(1, 2, 3, 4, 5, 6, 7, 8, 9);

        var result = numbers.slice(2);

        expect(result).not.toBe(numbers);
        expect(numbers).toContain(1, 2, 3, 4, 5, 6, 7, 8, 9);
        expect(result).toContain(3, 4, 5, 6, 7, 8, 9);
    });

    it('should return a new empty hooray (from an empty hooray) from a beginning (no ending)', function() {
        var numbers = new Hooray();

        var result = numbers.slice(12);

        expect(result).not.toBe(numbers);
        expect(result.length).toBe(0);
    });

    it('should return a new hooray with the same values of the original hooray when no beginning and no ending', function() {
        var numbers = new Hooray(1, 2, 3, 4, 5, 6, 7, 8, 9);

        var result = numbers.slice();

        expect(result).not.toBe(numbers);
        expect(numbers).toContain(1, 2, 3, 4, 5, 6, 7, 8, 9);
        expect(result).toContain(1, 2, 3, 4, 5, 6, 7, 8, 9);
    });

    it('should return a new hooray with the last values of the original hooray when beginning is negative and no ending', function() {
        var numbers = new Hooray(1, 2, 3, 4, 5, 6, 7, 8, 9);

        var result = numbers.slice(-4);

        expect(result).not.toBe(numbers);
        expect(numbers).toContain(1, 2, 3, 4, 5, 6, 7, 8, 9);
        expect(result).toContain(6, 7, 8, 9);
    });

    it('should return a new hooray with values of the original hooray from the beginning and ending, both negatives', function() {
        var numbers = new Hooray(1, 2, 3, 4, 5, 6, 7, 8, 9);

        var result = numbers.slice(-7, -3);

        expect(result).not.toBe(numbers);
        expect(numbers).toContain(1, 2, 3, 4, 5, 6, 7, 8, 9)
        expect(result).toContain(3, 4, 5, 6);
     
    });

    it('should return a new hooray with no values when the beginning and ending are both negatives and ending < beginning', function() {
        var numbers = new Hooray(1, 2, 3, 4, 5, 6, 7, 8, 9);

        var result = numbers.slice(-3, -7);

        expect(result).not.toBe(numbers);
        expect(numbers).toContain(1, 2, 3, 4, 5, 6, 7, 8, 9)
        expect(result.length).toBe(0);
    });
});