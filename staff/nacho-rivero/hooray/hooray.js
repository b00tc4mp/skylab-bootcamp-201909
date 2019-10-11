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