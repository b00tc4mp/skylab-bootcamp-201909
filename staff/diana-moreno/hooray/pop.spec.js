describe('hooray.pop', function() {
  it('should return the deleted item', function() {
    var hooray = new Hooray('a', 'b', 'c');
    var expected = ['a', 'b', 'c'];

    for (var i = 0; i < expected.length - 1; i++)
      expect(hooray[i]).toBe(expected[i]);

    expect(hooray.pop()).toBe('c');
    expect(hooray[Object.keys(hooray)[0]]).toBe('a');
    expect(hooray[Object.keys(hooray)[1]]).toBe('b');
    expect(hooray[Object.keys(hooray)[2]]).not.toBe('c');
  });

  it('should modify the original array', function() {
    var hooray = new Hooray('a', 'b', 'c');
    hooray.pop();
    var expected = ['a', 'b'];

    expect(hooray.length).toBe(expected.length);
    expect(hooray[hooray.length - 1]).not.toBe('c');
  });

  it('should return undefined when an empty array is passed', function() {
    var hooray = new Hooray();
    var result = hooray.pop();

    expect(result).toBe(undefined);
  });
});