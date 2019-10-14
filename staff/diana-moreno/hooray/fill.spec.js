describe('fill', function() {
  it('should fill the array with the item', function() {
    var hooray = new Hooray(1, 2, 3);
    var item = 'a';
    var expected = ['a', 'a', 'a'];
    hooray.fill(item);

    for (var i = 0; i < expected.length; i++)
      expect(hooray[i]).toBe(expected[i]);
  });

  it('should modify the original array', function() {
    var hooray = new Hooray(1, 2, 3);
    var item = 'a';
    var expected = ['a', 'a', 'a'];
    hooray.fill(item);

    for (var i = 0; i < expected.length; i++)
      expect(hooray[i]).toBe(expected[i]);
  });

  it('should receive an array with an item and first index', function() {
    var hooray = new Hooray(1, 2, 3, 4, 5);
    var item = 'a';
    var indexIni = 1;
    var expected = [1, 'a', 'a', 'a', 'a'];
    hooray.fill(item, indexIni);

    for (var i = 0; i < expected.length; i++)
      expect(hooray[i]).toBe(expected[i]);
  });

  it('should receive an array with an item, first index and final index', function() {
    var hooray = new Hooray(1, 2, 3, 4, 5);
    var item = 'a';
    var indexIni = 1;
    var indexEnd = 4;
    var expected = [1, 'a', 'a', 'a', 5];
    hooray.fill(item, indexIni, indexEnd);

    for (var i = 0; i < expected.length; i++)
      expect(hooray[i]).toBe(expected[i]);
  });

  it('should return an empty array when an empty array is passed', function() {
    var hooray = new Hooray();
    var result = hooray.fill('1');

    expect(result.length).toEqual(0);
  });

  it('should fail on receive a non-string or number as item', function() {
    var hooray = new Hooray(1, 2, 3);
    var fn = function(x) { return x + 2; };

    expect(function() { hooray.fill(fn); }).toThrowError(TypeError, 'function is not a string or a number');
    expect(function() { hooray.fill([1, 2, 3]); }).toThrowError(TypeError, 'object is not a string or a number');
    expect(function() { hooray.fill(false); }).toThrowError(TypeError, 'boolean is not a string or a number');
  });

  it('should fail on receive a non-number as index', function() {
    var hooray = new Hooray(1, 2, 3);
    var fn = function(x) { return x + 2; };

    expect(function() { hooray.fill('a', fn); }).toThrowError(TypeError, 'index should be a number');
    expect(function() { hooray.fill('a', [1, 2, 3]); }).toThrowError(TypeError, 'index should be a number');
    expect(function() { hooray.fill('a', true); }).toThrowError(TypeError, 'index should be a number');
    expect(function() { hooray.fill('a', 1, 'hello'); }).toThrowError(TypeError, 'index should be a number');
  });
});
