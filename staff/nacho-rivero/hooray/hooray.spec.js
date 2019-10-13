describe('Hooray prototype', function () {

    describe('Hooray.prototype.pop', function () {

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

        it('should be a hooray', function() {
            var number = new Hooray();

            expect(function () { number.pop() ;}).toThrowError(TypeError, number + 'is not a Hooray');
        })
    });

    describe('Hooray.prototype.push', function () {

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

    describe('Hooray.prototype.forEach', function () {

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

    describe('Hooray.prototype.concat', function(){
        it('should merge several arrays', function(){
            var array1 = [1, 2, 3];
            var array2 = [1, 2, 3];
            var newArray = concat(array1, array2);
            var expected = [1, 2, 3, 1, 2, 3];
            expect(newArray.length).toBe(6);
            expect(newArray).toEqual(expected);
        });
        it('should fail on undefined array', function(){
            var array;
            expect(function(){filter(array)}).toThrowError(TypeError, 'undefined is not an array');
        });
        it('should fail on different type to array passed', function(){
            expect(function(){concat(123, [1,2, 3])}).toThrowError(TypeError, '123 is not an array')
            expect(function(){concat('a', [1,2, 3])}).toThrowError(TypeError, 'a is not an array')
            
        });
})

    describe('Hooray.prototype.every', function () {
        it('should print true if all elements meet the condition', function () {
            var numbers = new Hooray(2, 3, 4, 5);
            
            var majorOne = function (item) {  return item > 1; };
            expect(numbers.every(majorOne)).toBe(true);
        });
        it('should print false if any element does not fulfill the condition', function () {
            var numbers = new Hooray(2, 3, 4, 5);
            
            var minorOne = function (item) {  return item < 1; };
            expect(numbers.every(minorOne)).toBe(false);
        });
        it('should fail on non-function expression', function () {
            var numbers = new Hooray(2, 3, 4, 5);
            expect(function() { numbers.every(undefined); }).toThrowError(TypeError, 'undefined is not a function');
            expect(function() { numbers.every(true); }).toThrowError(TypeError, 'true is not a function');
            expect(function() { numbers.every(1); }).toThrowError(TypeError, '1 is not a function');
        });
    });

    describe('Hooray.prototype.filter', function(){
        it('should be a valid array', function(){
            var condition = function(a) { return a + 2*a; };
            expect(function(){ filter(123, condition)}).toThrowError(TypeError, '123 is not an array');
            expect(function(){ filter('123', condition)}).toThrowError(TypeError, '123 is not an array');
        });
        it('should condition be a function', function(){
            var array = [1, 2, 3];
            expect(function(){ filter(array, 123)}).toThrowError(TypeError, '123 is not a function');
            expect(function(){ filter(array, '123')}).toThrowError(TypeError, '123 is not a function');
        });
    
    })

    describe('Hooray.prototype.find', function(){
        it('should fail when no declared arguments', function(){
            var array;
            var expression;
            expect(function(){ find(array, expression); }).toThrowError(TypeError, 'array and expression are undefined');
        });
        it('should fail if is not an array', function(){
            var array = 123;
            var expression = function(a) { a > 1; };
            expect(function(){ find(array, expression); }).toThrowError(TypeError, '123 is not an array');
        });
        it('should fail if is not an expression', function(){
            var array = [1, 2, 3];
            var expression = 123;;
            expect(function(){ find(array, expression); }).toThrowError(TypeError, '123 is not an array');
        });
        it('should fail if the array is not defined', function(){
            var array;
            var expression = function(a) { a > 1; };
            expect(function(){ find(array, expression); }).toThrowError(TypeError, 'array is not defined');
        });
        it(' is not a function', function(){
            var array = [1, 2, 3];
            var expression;
            
            expect(function(){ find(array, expression); }).toThrowError(TypeError, 'expression is not defined');
        });
        
    })

    describe('Hooray.prototype.findIndex', function(){
    
        it('should fail when no declared arguments', function(){
            var array;
            var expression;
            expect(function(){ find(array, expression); }).toThrowError(TypeError, 'array and expression are undefined');
        });
        it('should fail if is not an array', function(){
            var array = 123;
            var expression = function(a) { a > 1; };
            expect(function(){ find(array, expression); }).toThrowError(TypeError, '123 is not an array');
        });
        it('should fail if is not an expression', function(){
            var array = [1, 2, 3];
            var expression = 123;;
            expect(function(){ find(array, expression); }).toThrowError(TypeError, '123 is not an array');
        });
        it('should fail if the array is not defined', function(){
            var array;
            var expression = function(a) { a > 1; };
            expect(function(){ find(array, expression); }).toThrowError(TypeError, 'array is not defined');
        });
        it(' is not a function', function(){
            var array = [1, 2, 3];
            var expression;
            
            expect(function(){ find(array, expression); }).toThrowError(TypeError, 'expression is not defined');
        });
    })

    describe('Hooray.prototype.includes', function(){
    it('should fail when no declared arguments', function(){
        var array;
        var value;
        expect(function(){ includes(array, value); }).toThrowError(TypeError, 'array and value are undefined');
    });
    it('should fail if is not an array', function(){
        var array = 123;
        var value = 'aragorn';
        expect(function(){ includes(array, value); }).toThrowError(TypeError, '123 is not an array');
    });
    it('should fail if is not an value', function(){
        var array = [1, 2, 3];
        var value;
        expect(function(){ includes(array, value); }).toThrowError(TypeError, '123 is not an array');
    });
    it('should fail if the array is not defined', function(){
        var array;
        var value = 'gimli';
        expect(function(){ includes(array, value); }).toThrowError(TypeError, 'array is not defined');
    });
    
})

describe('Hooray.prototype.indexOf', function() {
  
    it('should fail on undefined array', function() {
        
      var array;
      expect(function() { indexOf(array, 'legolas'); }).toThrowError(TypeError, 'undefined is not an array');
    });
    it('should throw an error when others types different to array are passed', function() {
      expect(function() { indexOf('JL picard', 'Darth Vader'); }).toThrowError('JL picard is not an array');
      expect(function() { indexOf(123, 'Darth Vader'); }).toThrowError('123 is not an array');
    });
    it('should throw error an element non-string or number', function() {
      var array = [1, 2, 3, 'aragorn', 'gimli', 'legolas'];
      var space = function(a) { return a + ' ' }
      expect(function() { indexOf(array, space); }).toThrowError(TypeError, 'function is not a string or a number');
      expect(function() { indexOf(array, [1, 2, 3]); }).toThrowError(TypeError, 'object is not a string or a number');
      
    });
   });

describe('Hooray.prototype.shift', function(){
    it('should fail when others types different to array are passed', function() {
        var array;
        
        expect(function() { reverse('Lt O Neal'); }).toThrowError(TypeError, 'Lt O Neal is not an array');
        expect(function() { reverse(123); }).toThrowError(TypeError, '123 is not an array');
        expect(function() { shift(array); }).toThrowError(TypeError, 'undefined is not an array');
      });
})

describe('Hooray.prototype.slice', function() {

    it('should return a new hooray with the same values of the original hooray when no beginning and no ending', function() {
        var numbers = new Hooray(1, 2, 3, 4, 5, 6);
        var result = numbers.slice();
        expect(result).not.toBe(numbers);
        expect(numbers).toContain(1, 2, 3, 4, 5, 6);
        expect(result).toContain(1, 2, 3, 4, 5, 6);
    });

    it('should return a new hooray with the last values of the original hooray when beginning is negative and no ending', function() {
        var numbers = new Hooray(1, 2, 3, 4, 5, 6);
        var result = numbers.slice(-2);
        expect(result).not.toBe(numbers);
        expect(numbers).toContain(1, 2, 3, 4, 5, 6);
        expect(result).toContain(3, 4, 5, 6);
    });
    
    it('should return a new hooray with no values when the beginning and ending are both negatives and ending < beginning', function() {
        var numbers = new Hooray(1, 2, 3, 4, 5, 6);
        var result = numbers.slice(-1, -3);
        expect(result).not.toBe(numbers);
        expect(numbers).toContain(1, 2, 3, 4, 5, 6)
        expect(result.length).toBe(0);
    });
  });

})

describe('Hooray.prototype.some', function() {
    it('should throw an error on undefined array', function() {
      var array;
      var expression = function(a) { return a > 1 }
      expect(function() { some(array, expression); }).toThrowError(TypeError, 'undefined is not an array');
    });
    it('should return false on empty array received', function() {
      var array = [];
      var expression = function(a) { return a > 1 }
      expect(some(array, expression)).toBe(false);
    });
    it('should throw error when others types different to array are passed', function() {
      var expression = function(a) { return a > 1}
      expect(function() { some('Rocky', expression) }).toThrowError(TypeError, 'hello is not an array');
      expect(function() { some(123, expression) }).toThrowError(TypeError, '1 is not an array');
    });
    it('should throw error when others types different to function are passed', function() {
      var array = [1, 2, 3, 'aragorn', 'gimli', 'legolas'];
      expect(function() { some(array, 'Rambo') }).toThrowError(TypeError, 'hello is not a function');
      expect(function() { some(array, 123) }).toThrowError(TypeError, '1 is not a function');
    });
   });
