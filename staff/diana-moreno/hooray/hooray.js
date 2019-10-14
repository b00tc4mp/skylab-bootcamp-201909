function Hooray() {
  for (var i = 0; i < arguments.length; i++)
    this[i] = arguments[i];

  this.length = arguments.length;
};

/**
 * Iterates the current hooray and evaluates an expression on each item.
 * @param {Function} expression The expression to evaluate in each item of the hooray.
 * @throws {TypeError} If expression is not a function.
 */
Hooray.prototype.forEach = function(expression) {
  if (typeof expression !== 'function') throw TypeError(expression + ' is not a function');

  for (var i = 0; i < this.length; i++)
    expression(this[i], i, this);
};

/**
 * Pushes a variable number of items into this hooray.
 * @param {...any} item The item (or items) to push.
 * @returns {number} The new lenth of the hooray.
 */
Hooray.prototype.push = function() {
  for (var i = 0; i < arguments.length; i++)
    this[this.length++] = arguments[i];

  return this.length;
};

/**
 * Returns the index of the first element in the provided array that satisfies the provided testing function.
 * @param  {Array}   array Array to find in
 * @param  {Function} expression   Function that returns a condition
 * @return {Number}        First index that matches the condition
 * @throws {TypeError}    If expression is not a function
 */
Hooray.prototype.findIndex = function(expression) {
  if (!(expression instanceof Function)) throw TypeError(expression + ' is not a function');

  for (var i = 0; i < this.length; i++)
    if (expression(this[i])) return i;

  return -1;
};

/**
 * Returns a shallow copy of a portion of an array into a new array object selected from begin to end (end not included) where begin and end represent the index of items in that array. The original array will not be modified.
 * @param  {Array} array     Base array
 * @param  {Number} indexIni Initial index to select the portion of the array
 * @param  {Number} indexEnd End index to select the portion of the array
 * @return {Array}           A copy of the portion of the array
 */
Hooray.prototype.slice = function(indexIni, indexEnd) {
  var newArray = [];
  counter = 0;

  indexIni = indexIni || 0;
  indexIni = indexIni < 0 ? this.length + indexIni : indexIni;
  indexEnd = indexEnd || this.length;
  indexEnd = indexEnd < 0 ? this.length + indexEnd : indexEnd;

  for (var i = indexIni; i < indexEnd; i++) {
    newArray[counter++] = this[i];
    //counter++;// no hace falta declarar counter
  }
  return newArray;
};

/**
 * Creates a new array with the results of calling a provided function on every element in the calling array.
 * @param  {Array}   array Array to change
 * @param  {Function} expression    Function that produces an element of the new Array
 * @return {Array}         A new array with each element being the result of the callback function.
 * @throws {TypeError} If expression is not a function.
 */
Hooray.prototype.map = function(expression) {
  if (this.length === 0) return this;
  if (!(expression instanceof Function)) throw TypeError(expression + ' is not a function');

  var newArray = [];

  for (var i = 0; i < this.length; i++)
    newArray[i] = expression(this[i]);

  return newArray;
};

/**
 * Modifies all the elements of an array from a start index (default zero) to an end index (default array length) with a static value.
 * @param  {Array} array    Array to be modified
 * @param  {String, Number} item     Item to modify the array with
 * @param  {Number} indexIni Index to start to modify
 * @param  {NUmber} indexEnd Index to end to modify
 * @return {Array}          The modified array
 * @throws {TypeError} If item is not a string or a number, and indexIni and indexEnd are not a number.
 */
Hooray.prototype.fill = function(item, indexIni, indexEnd) {
  if (!(typeof item === 'number' || typeof item === 'string')) throw TypeError(typeof item + ' is not a string or a number');
  if (indexIni !== undefined && typeof indexIni !== 'number') throw TypeError('index should be a number');
  if (indexEnd !== undefined && typeof indexEnd !== 'number') throw TypeError('index should be a number');

  if (!indexEnd) indexEnd = this.length - 1;
  else if (indexEnd) indexEnd = indexEnd - 1;

  if (!item) item = undefined;
  if (!indexIni) indexIni = 0;

  for (var i = indexIni; i <= indexEnd; i++) {
    this[i] = item;
  };
  return this;
};

/**
 * Returns the value of the first element in the provided array that satisfies the provided testing function.
 * @param  {Array}   array Array to find in
 * @param  {Function} expression   Function that returns a condition
 * @return {Number}        First number that matches the condition
 * @throws {TypeError}    If expression is not a function
 */
Hooray.prototype.find = function(expression) {
  if (!(expression instanceof Function)) throw TypeError(expression + ' is not a function');

  for (var i = 0; i < this.length; i++)
    if (expression(this[i])) return this[i];

  return undefined;
};

/**
 * Tests whether at least one element in the array passes the test implemented by the provided function.
 * @param  {Array}   array   Array to pass the function
 * @param  {Function} expression     Function to be passed by the array
 * @return {Boolean}         Boolean value
 * @throws {TypeError} If expression is not a function
 */
Hooray.prototype.some = function(expression) {
  if (!(expression instanceof Function)) throw TypeError(expression + ' is not a function');

  for (var i = 0; i < this.length; i++)
    if (expression(this[i])) return true;

  return false;
};

/**
 * Tests whether all elements in the array pass the test implemented by the provided function.
 * @param  {Array}   array  Array to be verified
 * @param  {Function} expression    Function with the condition to pass
 * @return {Boolean}        A boolean value
 * @throws {TypeError}    If expression is not a function
 */
Hooray.prototype.every = function(expression) {
  if (!(expression instanceof Function)) throw TypeError(expression + ' is not a function');

  var counter = 0;
  for (var i = 0; i < this.length; i++)
    if (expression(this[i])) counter++;

  return counter === this.length ? true : false;
};

/**
 * Returns the first index at which a given element can be found in the array, or -1 if it is not present.
 * @param  {Array} array Array to search in
 * @param  {String, Number} item  Item to be searched in the array
 * @return {Number}       First index where the item has been found
 * @throws {TypeError}    If item is not a number or a string
 */
Hooray.prototype.indexOf = function(item) {
  if (!(typeof item === 'number' || typeof item === 'string')) throw TypeError(typeof item + ' is not a string or a number');

  for (var i = 0; i < this.length; i++)
    if (this[i] === item) return i;

  return -1;
};

/**
 * Reverses the order of the elements in an array and returns the new array
 * @param  {[Array]} array The array to reverse
 * @return {[Array]}       The array reversed
 */
Hooray.prototype.reverse = function(array) {
  var newArray = [];
  counter = 0;

  for (var i = this.length - 1; i >= 0; i--)
    newArray[counter++] = this[i];
  // counter++;

  for (var i = 0; i < this.length; i++)
    this[i] = newArray[i];

  return this;
};

/**
 * Determines whether an array includes a certain value among its entries, returning true or false as appropriate.
 * @param  {Array} array Array to search on
 * @param  {String, Number} item  Item to find in the array
 * @return {Boolean}       A boolean if found or not
 */
Hooray.prototype.includes = function(item) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] === item) return true;
  }
  return false;
};

/**
 * creates a new array with all elements that pass the test implemented by the provided function.
 * @param  {Array}   array Array to change
 * @param  {Function} expression    Function to pass to the array
 * @return {Array}         A new array with each element being the result of the callback function.
 * @throws {TypeError} If expression is not a function.
 */
Hooray.prototype.filter = function(expression) {
  if (!(expression instanceof Function)) throw TypeError(expression + ' is not a function');

  var newArray = [];
  var counter = 0;

  for (var i = 0; i < this.length; i++) {
    if (expression(this[i])) newArray[counter++] = this[i]
    //counter++
  }
  return newArray;
};

/**
 * Is used to merge two or more arrays without modifying the original array.
 * @param  {Array}  One or more rrays to merge
 * @return {Array} New merged array
 * @throws {TypeError} If expression is not a function.
 */
Hooray.prototype.concat = function() {
  var newArray = [];

  for (var i = 0; i < this.length; i++) // var newArray = [...this];
    newArray[newArray.length++] = this[i];

  for (var i = 0; i < arguments.length; i++) {
    if (!(arguments[i] instanceof Array)) {
      newArray[newArray.length++] = arguments[i];
    } else {
      for (var j = 0; j < arguments[i].length; j++) {
        newArray[newArray.length++] = arguments[i][j];
      }
    }
  }
  return newArray;
};

/**
 Creates and returns a new string by concatenating all of the elements in an array (or an array-like object), separated by commas or a specified separator string. If the array has only one item, then that item will be returned without using the separator.
 * @param  {Array} array Array to convert to string.
 * @return {string}      String with all the elements of the array concatenated and separated by commas.
 */
Hooray.prototype.join = function(separator) {
  var string = '';
  if (!separator) separator = ',';
  if ((separator instanceof Function)) throw TypeError('separator cannot be a function');

  for (var i = 0; i < this.length; i++) {
    if (string.length === 0) string += this[0];
    else string += (separator + '') + this[i];
  }
  return string;
};

/**
 * Remove the last element of the array and return the element
 * @param  {Array} array The array to delete the last item
 * @return {Number}       The last element of the array
 */
Hooray.prototype.pop = function() {
  if (this.length == 0) return undefined;

  var lastElem = this[this.length - 1];
  delete this[this.length - 1];
  this.length--;
  return lastElem;
};

/**
 * Removes the first element of the array and returns the element
 * @param  {Array} array Array to remove the element from
 * @return {...any}       The first element of the array
 */
Hooray.prototype.shift = function() {
  if (this.length == 0) return undefined;

  var firstElem = this[0];

  for (var i = 0; i < this.length - 1; i++)
    this[i] = this[i + 1];

  delete this[this.length - 1];
  this.length--;
  return firstElem;
};

/**
 * Adds one or more elements to the first positions of the array and returns the new array length
 * @param  {Array} array The array to add items to.
 * @param {...any} item The item (or items) to add.
 * @return {Number}       The new array length
 */
Hooray.prototype.unshift = function() {
  let newArray = [];

  for (var i = 0; i < arguments.length; i++)
    newArray[i] = arguments[i];

  for (var i = 0; i < this.length; i++)
    newArray[newArray.length++] = this[i];

  for (var i = 0; i < newArray.length; i++) {
    this[i] = newArray[i];
    this.length = i + 1;
  }
  return this.length;
};

/**
 * sorts the elements of an array in place and returns the sorted array
 * @param  {Array}   array Array to sort
 * @param  {Function} expression    Function that decides if the sort is increasing or decreasing
 * @return {Array}         Array sorted
 * @throws {TypeError}    If expression is not a expression
 */
Hooray.prototype.sort = function(expression) {
  if (!expression) expression = function() { return 1; };
  if (!(expression instanceof Function)) throw TypeError(expression + ' is not a function');

  var decreasing = function() {
    if (this[j] < this[j + 1]) {
      var aux = this[j + 1];
      this[j + 1] = this[j];
      this[j] = aux;
    }
  };

  var increasing = function() {
    if (this[j] > this[j + 1]) {
      var aux = this[j + 1];
      this[j + 1] = this[j];
      this[j] = aux;
    }
  };

  for (var i = 0; i < this.length; i++) {
    for (var j = 0; j < this.length - 1 - i; j++) { // con -i es más eficiente
      if (expression(2, 1) === 1 - 2) {
        decreasing.bind(this)();
      } else {
        increasing.bind(this)();
      }
    }
  };
  return this;
};
/**
 * Sorts an array randomly
 * @param  {Array} array Array to sort randomly
 * @return {Array}       A copy of the array sorted randomly
 */
Hooray.prototype.shuffle = function() {
  var result = [];
  for (var i = 0; i < this.length; i++) result[i] = this[i];
  for (var i = 0; i < result.length; i++) {
    var random = Math.floor(Math.random() * result.length); // 0 <> length-1

    var value = result[i];
    result[i] = result[random];
    result[random] = value;
  }
  return result;
};

/**
 * Executes a reducer function (that you provide) on each element of the array, resulting in a single output value.
 * @param  {Array} array      Array to be reduced
 * @param  {Function} expression Function to reduce with
 * const reducer = (accumulator, currentValue) => accumulator + currentValue;
 * @return {[type]}            returned value is assigned to the accumulator of expression
 */
Hooray.prototype.reduce = function(reducer) {
  if (typeof reducer !== 'function') throw TypeError(reducer + ' is not a function');
  if (this.length === 0) throw TypeError('Reduce of empty array with no initial value');

  var result = this[0]
  for (i = 1; i < this.length; i++) {
    result = reducer(result, this[i]);
  };
  return result;
};

/**
 * changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.
 * @param  {Array} array The array to modify
 * @param  {Number} indexIni Optional: index to start to cut
* @param  {Number} deleteCount Optional:
    An integer indicating the number of elements in the array to remove from start.
    If deleteCount is omitted, or if its value is equal to or larger than array.length - start (that is, if it is equal to or greater than the number of elements left in the array, starting at start), then all the elements from start to the end of the array will be deleted.
    If deleteCount is 0 or negative, no elements are removed. In this case, you should specify at least one new element (see below).
* @param      {...any} items Optional:
    The elements to add to the array, beginning from start. If you do not specify any elements, splice() will only remove elements from the array.
* @return {Array}       the deleted elements of the array
* @throws {TypeError}    If array is not an array
 */
Hooray.prototype.splice = function() {
  var array = this;
  var indexIni = arguments[0];
  var deleteCount = arguments[1] || arguments[1] === 0 ? arguments[1] : array.length - indexIni;
  if (deleteCount > array.length) deleteCount = array.length - indexIni;
  var items = [];

  if (arguments[2]) {
    for (let i = 2; i < arguments.length; i++)
      items[i - 2] = arguments[i];
  };
  var newArray = [];
  var deleted = [];

  for (var i = 0; i < indexIni; i++) {
    newArray[i] = array[i];
  };
  for (let i = 0; i < items.length; i++) {
    newArray[newArray.length] = items[i];
  };
  var counter = 0;
  for (var i = indexIni; i < indexIni + deleteCount; i++) {
    deleted[counter++] = array[i];
  }
  for (var i = indexIni + deleteCount; i < array.length; i++) {
    newArray[newArray.length] = array[i];
  };

  // modify the original array
  // add the new elements
  for (let i = 0; i < newArray.length; i++) {
    array[i] = newArray[i];
  };
  // delete the last elements
  for (let i = newArray.length; i < array.length; i++) {
    delete array[i];
  };
  array.length = newArray.length;
  return deleted;
};

// the negative cases are missing
