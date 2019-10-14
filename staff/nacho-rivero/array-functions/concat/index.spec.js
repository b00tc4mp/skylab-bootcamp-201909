describe('concat', function(){

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