function Hooray() {
    for (var i = 0; i  < arguments.length; i++)
        this[i] = arguments[i];

    this.length = arguments.length;
}

/**
 * Iterates the current hooray and evaluates an expression on each item.
 * 
 * @param {Function} expression The expression to evaluate in each item of the hooray.
 * 
 * @throws {TypeError} If expression is not a function.
 */
Hooray.prototype.forEach = function(expression) {
	if (typeof expression !== 'function') throw TypeError(expression + ' is not a function');

	//throw Error('🤡');
	for (var i = 0; i < this.length; i++) 
		expression(this[i], i, this);
};

/**
 * Pushes a variable number of items into this hooray.
 * 
 * @param {...any} item The item (or items) to push.
 * 
 * @returns {number} The new lenth of the hooray.
 */
Hooray.prototype.push = function() { 
	for (var i = 0; i < arguments.length; i++)
		this[this.length++] = arguments[i];

	return this.length;
};

/**
 * The pop method removes the last element of an
 * array, and returns that element.
 * @param {Arguments} arguments The object to pop elements from.
 * 
 * @returns {last} Returns the argument without the last element.
 * 
 * 
 */

Hooray.prototype.pop = function() {
    if(this.length === 0) throw TypeError(this + 'is not a Hooray');

	var last = this[this.length - 1];
 
	delete this[this.length - 1];

	this.length = this.length - 1;
 
	return last; 
 
 }

 /**
 * Map method creates a new array with the results of the function 
 * callback applied to each one of its elements.
 * @param {Array} array The array where we will use map() method.
 * @param {Function} expression The expression that will produce elements for the new array.
 * @param {currentValue} array[i] The current element of the array that its being processed.
 * @param {index} i The current index inside the array.
 * @returns {result} result[i] Result is the new array composed by the elements created through the callback function.
 */

Hooray.prototype.map = function(expression) {

	if (!(this instanceof Array)) throw TypeError(array + ' NaN valid');
	 
	var result = [];           
   
	for (var i = 0; i < this.length; i++)
   
	  result[i] = expression(this[i], i, this);

	return result;
 
   }
   
   /**
 * Modifies the array from the start index (default zero) to an end index (default array length). Returns the modified array
 * @param {*} array The array to modificate.
 * @param {*} value The value to introduce in the array.
 * @param {*} start The index in the array to start the introduction of the value.
 * @param {*} end The last index to introduce the value.
 */

Hooray.prototype.fill = function(value, start, end) {
	debugger
    if(!(this instanceof Array)) throw TypeError (this + ' is not an array');
    if(!(this instanceof Function)) throw TypeError (this + ' is not a function');

    if (end){
       
        for (i = start; i<end; i++){
            this[i]=value;
        }

        return  this[i]=value;
        
    } 

    else if (start){

        for (j=start-1; j<this.length-1; j++){ //  
            this[j]=value;
        }

        return  this[j]=value;

    } else 
    
        {

        for (var j=0; j<this.length-1; j++){
            this[j]=value;
        }

        return  this[j]=value;
    }
}

/**
 * To join two or more arrays. This method does not change existing arrays.
 * 
 * @param {...any} item The items array to start joining.
 * @param {...any} item The item (or items) to join.
 * @returns {Array} the new array created with all items joined
 */


Hooray.prototype.concat = function() {
  
  if(!(arguments instanceof Array)) throw TypeError (arguments + 'is not an array');

  var newArray = [];

  for (var i = 0; i < this.length; i++) {
     newArray[newArray.length++] = this[i]; 
  }
      
  for (var i = 0; i < arguments.length; i++) {

    if (arguments[i] instanceof Array) {

        for (var j = 0; j < arguments[i].length; j++) {
        newArray[newArray.length++] = arguments[i][j];
      
    } else {
        
        newArray[newArray.length++] = arguments[i];
      
      }
    }
  }
  return newArray;
};


/**
 * Checks if all the elements in the array pass the condition implemented by the given function
 * 
 * @param {Array} array The array to evaluate elements to the condition given 
 * 
 * @param {Function} expression The expression to evaluate in each item of the array.
 * 
 * @returns {boolean} returns true if all the elements in the array pass the condition; otherwise, false.
 * 
 */

Hooray.prototype.every = function (expression) {
    if (typeof expression !== 'function') throw TypeError(expression + ' is not a function');
    
    for (let i = 0; i < this.length; i++) {
        if (!expression(this[i])) return false;
    }
    return true;
};

/**
 * Filter method creates a new array with all the elements that fullfill
 * the established condition by the given function. the results of the function 
 * 
 * @param {Array} array The array to be filtered.
 * @param {Condition} condition Callback that checks the condition on each element of the array.
 * @param {currentValue} array[i] The current element of the array that its being processed.
 * @param {index} i The current index inside the array.
 * @returns {result} result[i] Result is the new array composed by the elements created through the callback function.
 */

 Hooray.prototype.filter = function(expression) {
  
  if (!(this instanceof Array))throw TypeError (this + ' is not an array');
  if (!(expression instanceof Function)) throw TypeError(expression + ' is not a function');

  var result = [];
  var count = 0;

  for (var i = 0; i < this.length; i++) {
    if (expression(this[i])){
        result[count] = this[i];
        count++;
    } 
    return result;
  }
  
};

/**
 * Returns de value of the fisrt element in the array that satisfies the condition.
 * @param {array} Array The array to be inspected.
 * @param {condition} expression that specifies what condition should be provided.
 */

Hooray.prototype.find = function (expression){
    if(!arguments.length) throw TypeError('no declared arguments');
    if(!(this instanceof Array))  throw TypeError (this + ' is not an array');
    if(!(expression instanceof Function)) throw TypeError(expression + ' is not a function');

    for(var i = 0 ; i<this.length ; i++){
        if(expression(this[i])){
            return this[i];
    };
}
}

/**
 * Returns the index of the fisrt element in the array that satisfies the providing test function. If any element pass the test, it returs -1.
 * @param {*} array The array given.
 * @param {*} expression The test function.
 */

Hooray.prototype.findIndex = function(expression){

    if(!arguments.length) throw TypeError ('missing argument 0 when calling function');
    if(!(this instanceof Array)) throw TypeError(`${this} is not an array`);
    if(!(expression instanceof Function)) throw TypeError (`${expression} is not a function`);

    for(var i = 0 ; i<this.length ; i++){
        if(expression(this[i])){
            return i;
        }
        return -1
    }
}

/**
 * Method determines if the element it is included in the array or not. Returns a boolean.
 * @param {*} array The array given.
 * @param {*} value The element to find in the array.
 */

Hooray.prototype.includes = function (value){
    
    var found = false;
    
    for(i=0; i<this.length; i++){
      
        if(this[i] === value){
            found = true;

            return found;
        } 
      return found;  
    } 
}

/**
 * Returns the first index at element can be found in the array. Otherwise,  it returns -1.
 * @param {*} element The element to locate in the array.
 * @param {*} index Optional. The index to start to search
 */

Hooray.prototype.indexOf = function (element) {

  if (!(this instanceof Array)) throw TypeError(this + ' is not an array');
  if (!(typeof element === 'number' || typeof element === 'string')) throw TypeError(typeof element + ' is not a string or a number');

    for (var i = 0; i < this.length; i++) {
      if (element === this[i]) {
        
        return i;
        }
    }
    return -1;
  }

/**
 * Method returns a new string concatening all elements with a separator introduced. If is not introduced () or it is (',') (''), it returns the elements separated with coma.
 * @param {*} array The array to modificate.
 * @param {*} separator The element to add and use to separate each element.
 */

Hooray.prototype.join = function (separator) {

    if (!(this instanceof Array)) throw TypeError(array + ' is not an array');
    if ((separator instanceof Function)) throw TypeError('separator cannot be a value');
    if ((separator instanceof Function)) throw TypeError('separator cannot be a function');
    if ((separator instanceof Function)) throw TypeError('separator cannot be an array');

      var string = '';
      if (separator == '' || separator == undefined) {
        separator = ',';
      };
        for (var i = 0; i < this.length; i++) {
          if (i === this.length - 1) {
            string += this[i];
          } else {
            string += this[i] + separator;
          }
          return string;
          
        }
      }

/**
 * Executed a reducer function on each element of the array, resulting a single output value.
 * @param {array} array The array to reduce.
 */

Hooray.prototype.reduce = function (expression) {
    if (arguments.length !== 2 && arguments.length !== 3) throw TypeError("Wrong number of arguments: two expected (Array, Callback function).");
    if (!(this instanceof Array)) throw TypeError("First argument must be an array.");
    
    var accumulator = 0;
    
    for (var i = 0; i < this.length; i++){
        if (i === 0) {
            
            expression(0, this[i], i, this);
        }
        if(i === 1){
            accumulator = expression(this[0], this[i], i, this);
        }
        if(i > 1) {
            accumulator = expression(accumulator, this[i], i, this);
        } 
    };
        
    return accumulator;
};

/**
 * Method to reverse the array. It returns the array modified. The last input becomes the first.
 * @param {array} array The array to reverse its numbers.
 */

Hooray.prototype.reverse = function () {
    if(!(this instanceof Array)) throw TypeError(this + ' is not an array');
    
    var rarray = [];
    for (var i = 0; i < this.length; i++) {
        
        rarray[i] = this[this.length - 1 - i];
        
        for(var j = 0; j < rarray.length; j++){
            this[i] = rarray[j];
        }
    }
    return array;
  }

/**
 * Sort the elements of the array and returns the sorted array.
 * @param {*} array array to be sorted.
 */

Hooray.prototype.sort = function (){

    if (!(this instanceof Array)) throw TypeError(array + ' is not an array');

      var temp = []; 
      for (var i = 1; i < this.length; i++) {
        for (var j = 0; j < this.length - i; j++){
          if(array[i] > array[j]){
            temp = array[i];
            array[i] = array [j];
            array[j] = temp;
          }
         }
        }
      return array;
      }


      
/**
 * Method removes the first element from an array and it returns the removed element.
 * @param {array} array The array to be shifted.
 * 
 */

Hooray.prototype.shift = function () {

  if (!(this instanceof Array)) throw TypeError(this + ' is not an array');

    var first = this[0];

    for(var i = 1; i < this.length; i++) {
        this[i-1] = this[i];
      }

    this.length = this.length - 1;
    
    return first;
}


/**
 * Copies a part of the hooray within a new array starting from beginning
 *  to end (end not included). The original array will not be modified.
 * 
 * @param {number} begin Index for starting position 
 * 
 * @param {number} end Index for ending position 
 * 
 * @returns {Hooray} New hooray with the extracted values 
 */

Hooray.prototype.slice = function(begin, end) {
    
    var result = []; 
    begin = begin || 0;
    begin = begin < 0? this.length + begin : begin;
    end = end || this.length;
    end = end < 0? this.length + end : end;
    for (var i = begin; i < end; i++)
        result[i - begin] = this[i];
    
    return result;
}

/**
 * Method test whether at least one element in the array pass the test. It returns a boolean expression.
 * @param {array} array The array to do the test.
 * @param {expression} expression The function test provided.
 */
 
Hooray.prototype.some = function (expression){

    if(!(this instanceof Array)) throw TypeError(`${this} is not an array`);
    if(!(expression instanceof Function)) throw TypeError (`${expression} is not a function`);

    var pass = false;
    for (var i=0; i<this.length; i++){
        
        if (expression(this[i])){
            pass = true;
        }
    }
    return pass;
}

/**
 * The unshift() method adds one or more elements to the beginning of an array and returns the new length of the array.
 * Add new elements to the begin of an array. Mutates array and return mutated array length.
 * 
 * @param {Array} array Array to modify, followed by any new element to place at arr begining.
 */

Hooray.prototype.unshifty = function () {
    
    if (!(this instanceof Array)) throw TypeError("unshifty this is not an array");

    var item = arguments.length - 1;
    var length = this.length;
    for (var i = length - 1; i >= 0; i--){
        this[i + item] = this[i]
    }
    for (var j = item; j < arguments.length; j++)
        this[j - item] = arguments[j];
    
    return array.length;
}