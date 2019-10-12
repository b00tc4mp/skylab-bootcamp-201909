function Hooray() {
    for (var i = 0; i  < arguments.length; i++)
        this[i] = arguments[i];

	this.length = arguments.length;	
}
// ----------------------FOR EACH-------------------------------------------
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

// ------------------------PUSH-----------------------------------------
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

// -------------------------MAP----------------------------------------
/**
 *  Create a new Hooray aplying the expresion 
 * 
 * @param {*} expression The expression to evaluate in each item of the array.
 * 
 * @throws {TypeError} If expression is not a function.
 */
Hooray.prototype.map = function(expression) { 	
	if (typeof expression !== 'function') throw TypeError(expression + ' is not a function')
	
	var hoorayAux = new Hooray();	
	for (var i = 0; i < this.length; i++) 
		hoorayAux[i] = expression(this[i], i , this);

	hoorayAux.length = this.length;
	return hoorayAux;
};

// --------------------------POP---------------------------------------
/**
 * 
 * @returns {string} value of last array.
 * 
 */
Hooray.prototype.pop = function() { 
	var deletedElement = this[this.length - 1]
	delete this[this.length - 1]  
	this.length = this.length - 1
    return deletedElement;
};


// --------------------------CONCAT--------------------------------------
/**
 * Concat array with arguments and return a new array with all array elements  + arguments
 * 
 * @param {*} array The array to concatenate elements to newArray
 * 
 * 
 * @returns {*} newArray contains: array + arguments.
 * 
 */
Hooray.prototype.concat = function() { 	
	var hoorayAux = new Hooray();	
	
    for (var y = 0; y < this.length; y++){
        hoorayAux[y] = this[y];
    }
		
    for (var i = 0; i < arguments.length; i++) {
		if (arguments[i] instanceof Array) {
			for (var j = 0; j < arguments[i].length; j++){
				hoorayAux[y] = arguments[i][j];
				++y
			}
		} else {
			hoorayAux[y] = arguments[i];
			++y			
		}
	}      
	hoorayAux.length = y;
    return hoorayAux;
    
};


// --------------------------INCLUDES--------------------------------------
/**
 * 
 * 
 * @param {*} array The array to concatenate elements to newArray
 * 
 * 
 * @returns newArray contains: array + arguments.
 * 
 */
Hooray.prototype.includes  = function() { 	    
    var finded = true;
    var continua = true;
    for (var i = 0; i < arguments.length && finded; i++) {
        continua = true;
        for (var j = 0; j < this.length&&continua; j++) {
            if (arguments[i]===this[j]) {
               continua = false               
            }              
        } 
        if (continua) finded=false;     
    }       
    return finded;
    
};

// --------------------------SHIFT--------------------------------------
/**
 * Delete the first element of elements
 * 
 * 
 * @returns {elementDeleted} return element deleted.
 */
Hooray.prototype.shift = function() { 
	var elementDeleted = this[0]
	for (var i = 1; i < this.length; i++) {
		this[i-1] = this[i]; 
	}
	delete this[this.length-1]  
    this.length = this.length - 1;
    return elementDeleted;
};

// --------------------------SLICE--------------------------------------
/**
 * returns a  copy of a portion of an array into a 
 * new array object selected from begin to end
 * 
 * @param {*} array origin array
 * @param {*} begin start index 
 * @param {*} end  end index
 * 
 * @returns{new array} new array with the values copyed
 * 
 */
Hooray.prototype.slice = function slice(begin, end) {
    
    var hoorayAux = new Hooray();

    if (begin > this.length) return hoorayAux;

    begin = begin || 0;
    if (begin < 0){
        begin = this.length + begin;
        if (begin < 0) begin = 0;
    };
    end = end || this.length;
    end = end < 0? this.length + end : end;

    for (var i = begin; i < end; i++)
	   	hoorayAux[i - begin] = this[i];

	hoorayAux.length = end < begin? 0 : end - begin;
    
    return hoorayAux;
};