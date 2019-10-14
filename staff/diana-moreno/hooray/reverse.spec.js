describe('reverse', function() {
  it('should invert the order of the elements in the array', function() {
    var hooray = new Hooray('a', 'b', 'c', 'd');
    var expected = ['d', 'c', 'b', 'a'];
    hooray.reverse();

    expect(hooray.length).toBe(4);

    for (var i = 0; i < expected.length; i++)
      expect(hooray[i]).toBe(expected[i]);
  });

  it('should modify the original array', function() {
    var hooray = new Hooray('a', 'b', 'c', 'd');
    var expected = ['d', 'c', 'b', 'a'];
    hooray.reverse();

    expect(hooray.length).toEqual(expected.length);
    for (var i = 0; i < expected.length; i++)
      expect(hooray[i]).toBe(expected[i]);
  });

  it('should return an empty array when an empty array is passed', function() {
    var hooray = new Hooray();
    var expected = [];

    expect(hooray.reverse().length).toEqual(expected.length);
    expect(hooray.reverse().length).toEqual(0);
  });
});