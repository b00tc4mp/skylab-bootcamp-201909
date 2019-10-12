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
}

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
}	