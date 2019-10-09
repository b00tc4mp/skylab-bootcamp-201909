describe('fill', function () {
    it('should succed on correct array and item to fill with', function () {
        var array = [1, 2, 3, 4];
        var item = 6;
        fill(array, item);
        expect(array.toString()).toBe([6, 6, 6, 6].toString());
    })

    it('should succed on correct array, item to fill with and start index', function () {
     var array = [1, 2, 3, 4, 5, 6, 7];
        var item = 9;
        var start = 2
      fill(array, item, start);
        expect(array.toString()).toBe([1, 2, 9, 9, 9, 9, 9].toString());
    })

    it('should succed on correct array, item to fill with, start index and end index', function () {
        var array = [1, 2, 3, 4, 5, 6, 7];
        var item = 8;
        var start = 1;
        var end = 5;
        fill(array, item, start, end);
        expect(array.toString()).toBe([1, 8, 8, 8, 8, 6, 7].toString());
    })

    it('should succed with undefined when item is not passed', function () {
        var array = [1, 2, 3];
        fill(array);
        expect(array.toString()).toBe([undefined, undefined, undefined].toString());
    })

    it('should fail on no array', function(){
        var array;
        var item = 3;

        expect(function() { fill(array,item);}).toThrow(TypeError, array + ' is not an array');
    })

    it('should fail on array null', function(){
        var array = null;
        var item = 3;

        expect(function() { fill(array,item);}).toThrow(TypeError, array + ' is not an array');
    })

})