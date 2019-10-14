describe('sort', function() {
  it('should sort the array ascending', function() {
    var hooray = new Hooray(5, 6, 2, 4, 9, 0);
    var expected = [0, 2, 4, 5, 6, 9];

    var fn = function(a, b) { return a - b; };
    hooray.sort(fn);
    for (var i = 0; i < expected.length; i++)
      expect(hooray[i]).toBe(expected[i]);

    var fn2 = function(a, b) { return b === a; };
    hooray.sort(fn2);
    for (var i = 0; i < expected.length; i++)
      expect(hooray[i]).toBe(expected[i]);

    hooray.sort();
    for (var i = 0; i < expected.length; i++)
      expect(hooray[i]).toBe(expected[i]);
  });

  it('should sort the array descending', function() {
    var hooray = new Hooray(5, 6, 2, 4, 9, 0);
    var fn = function(a, b) { return b - a; };
    hooray.sort(fn);
    var expected = [9, 6, 5, 4, 2, 0];

    for (var i = 0; i < expected.length; i++)
      expect(hooray[i]).toBe(expected[i]);
  });

  it('could receive a function or not, if not, sorts ascending', function() {
    var hooray = new Hooray(5, 6, 2, 4, 9, 0);
    var expected = [0, 2, 4, 5, 6, 9];
    hooray.sort();

    for (var i = 0; i < expected.length; i++)
      expect(hooray[i]).toBe(expected[i]);
  })

  it('should modify the original array', function() {
    var originalArray = [1, 2, 3, 4];
    var hooray = new Hooray(5, 6, 2, 4, 9, 0);
    var fn = function(a, b) { return b - a; };
    var result = hooray.sort(fn);

    expect(result).not.toEqual(originalArray);
  });

  it('should return an empty array if receive an empty array',
    function() {
      var hooray = new Hooray();
      let arrLength = hooray.sort().length;

      expect(arrLength).toBe(0);
    });

  it('should fail on non-function expression', function() {
    var hooray = new Hooray(5, 6, 2, 4, 9, 0);

    expect(function() { hooray.sort([1, 2]); }).toThrowError(TypeError, '1,2 is not a function');
    expect(function() { hooray.sort(true); }).toThrowError(TypeError, 'true is not a function');
    expect(function() { hooray.sort(1); }).toThrowError(TypeError, '1 is not a function');
  });
});