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

// --------------------------JOIN--------------------------------------
/**
 * reates and returns a new string by concatenating all of the elements in an array
 *  separated by commas or a specified separator string.
 * 
 * @param {*} array origin array
 * @param {*} sep separator
 * 
 * @return{index} return the index where it finds the value passed by parameters
 * 
 */
Hooray.prototype.join = function(sep){

    if(sep === undefined)
        sep =',';
    result = '';
    for (var i = 0; i < this.length; i++) {
        if (i === this.length - 1)
            result += this[i];
        else
            result +=this[i] + sep;
	} 
    return result;
}

// --------------------------EVERY--------------------------------------
/**
 * check if all array elements pass the test implemented by the expression
 * 
 * @param {*} array array The array to iterate.
 * @param {*} expression The expression to evaluate in each item of the array.
 * 
 * retunr {bolean} return true or false
 */
Hooray.prototype.every = function (expression) {
	if (typeof expression !== 'function') throw TypeError(expression + ' is not a function');
	
    for (let i = 0; i < this.length; i++) {
        if (!expression(this[i])) return false;
    }
    return true;
};

// --------------------------FILL--------------------------------------
    /**
     * Modifies all the elements of an array from a start index 
     * (default zero) to an end index (default array length) with a static value.
     * 
     * @param {*} value static value
     * @param {*} begin start index 
     * @param {*} end  end index
     * 
     */
Hooray.prototype.fill  = function(value, begin, end) {
	if (begin > this.length) return;
	
    begin = begin || 0;
    if (begin < 0){
        begin = this.length + begin;
        if (begin < 0) begin = 0;
    };
    end = end || this.length;
    end = end < 0? this.length + end : end; 
       
    for (var i = begin; i < end; i++)
        this[i] = value;
};

// --------------------------REVERSE--------------------------------------
/**
 * 
 * @param {*} array The array to reverse sort elements to. 
 */
Hooray.prototype.reverse = function() { 	

    var arrayAux = [];
    var j = 0;
    for (var i = (this.length-1); i > -1; i--) {
        arrayAux[j] = this[i];       
        j += 1;
    }
    for (var x = 0; x < this.length; x++) {
        this[x] = arrayAux[x];       
    }

    return this;
};

// --------------------------FILTER--------------------------------------
/**
 * creates a new array with all elements that pass the test implemented by the expresion.
 *
 * @param {*} expression The expression to evaluate in each item of the array.
 * 
 * @return{newArray} returns in a new array with the values ​​that meet the expression
 */
Hooray.prototype.filter = function(expression) { 	
    if (typeof expression !== 'function') throw TypeError(expression + ' is not a function')
    var hoorayAux = new Hooray();
    var boleana;
    var j = 0;
	for (var i = 0; i < this.length; i++) {    
        boleana = expression(this[i])   
        if (boleana) {
            hoorayAux[j]=this[i]
            j++
        }           
    }
    hoorayAux.length=j;
    return hoorayAux;
}