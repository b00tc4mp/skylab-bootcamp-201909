describe('Hooray prototype', function () {

    describe('pop', function () {

        var numbers;

        beforeEach(function () {
            numbers = new Hooray(1, 2, 3);
        });

        it('should pop only 1 value', function () {
            
            var result = numbers.pop();
            var expectNumbers = new Hooray(1, 2);;

            expect(numbers).toEqual(expectNumbers);
            expect(result).toBe(3);
            expect(numbers.length).toBe(2);

        });

        it('should jkshd', function() {
            var number = new Hooray();

            expect(function () { number.pop() ;}).toThrowError(TypeError, number + 'is not a Hooray');
        })
    });

    describe('push', function () {

        var hooray;

        beforeEach(function () {
            hooray = new Hooray('a', 'b', 'c');

        })

        it('should push a single item', function () {


            expect(hooray.push('d')).toBe(4);
            expect(hooray.length).toBe(4);
            expect(hooray[hooray.length - 1]).toBe('d');

            var chars = ['a', 'b', 'c', 'd'];
            for (var i = 0; i < chars.length; i++)
                expect(hooray[i]).toBe(chars[i]);
        });

        it('should push multiple items', function () {

            expect(hooray.push('d', 'e', 'f', 'g', 'h', 'i', 'j', 'k')).toBe(11);
            expect(hooray.length).toBe(11);

            var chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
            for (var i = 0; i < hooray.length; i++)
                expect(hooray[i]).toBe(chars[i]);
        });
    });

    describe('forEach', function () {

        var numbers, hooray;

        beforeEach(function () {
            numbers = new Hooray(1, 2, 3);
            hooray = new Hooray(1, 2, 3);
        })

        it('should succeed on correct hooray and expression, adding all numbers', function () {

            var result = 0;
            var add = function (number) { result += number; };

            numbers.forEach(add);

            expect(result).toBe(6);
        });

        it('should succeed on correct hooray and expression, concatenating all numbers', function () {

            var result = '';
            var concatenate = function (number) { result += number; };

            numbers.forEach(concatenate);

            expect(result).toBe('123');
        });


        it('should succeed on correct hooray and expression, multiplying all numbers by 10', function () {

            var result = [];
            var multiply = function (number, index) { result[index] = number * 10; };

            numbers.forEach(multiply);

            expect(result.length).toBe(numbers.length);

            for (var i = 0; i < result.length; i++)
                expect(result[i]).toBe(numbers[i] * 10);
        });

        it('should fail on undefined expression', function () {

            var expression; // = console.log;

            expect(function () { hooray.forEach(expression); }).toThrow(TypeError, 'undefined is not a function');
        });

        it('should fail on non-function expression', function () {

            expect(function () { hooray.forEach(undefined); }).toThrow(TypeError, 'undefined is not a function');
            expect(function () { hooray.forEach(true); }).toThrow(TypeError, 'true is not a function');
            expect(function () { hooray.forEach(1); }).toThrow(TypeError, '1 is not a function');
        });
    });


})

