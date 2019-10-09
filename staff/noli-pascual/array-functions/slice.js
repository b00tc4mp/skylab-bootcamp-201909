/**
 * The slice() method returns a shallow copy of a portion of an array into a new array
 * object selected from begin to end (end not included) where begin and end
 * represent the index of items in that array. The original array will not be modified.
 * 
 * @param {Array} array
 * @param {Function} function that specifies the condition
 * 
 * @returns {number} the position of the first element that accomplish the condition
 */

function slice(arr, indexIni, indexFin) { 
    var newArray = []
    if(indexFin === undefined) {
        indexFin = arr.length;
    }
	
	for(i = indexIni; i < indexFin; i++) {
		
		newArray[newArray.length] = arr[i];
    }
    return newArray;
}

var array = ['index0', 'index1', 'index2', 'index3', 'index4'];
slice(array, 3, 4);


