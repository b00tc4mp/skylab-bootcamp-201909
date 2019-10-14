/**
 * 
 * returns a shallow copy of a portion of an array into a new array object 
 * selected from begin to end (end not included) where begin and end represent
 *  the index of items in that array. The original array will not be modified
 * 
 * @param {*[]} array 
 * @param {*} start 
 * @param {*} end 
 * @returns {*[]}
 */
function slice(array, start, end) {

    if (!(array instanceof Array)) throw new TypeError(array + ' is not an arrar');

    if (start === undefined && end === undefined) {
        return array;
    } else if (start !== undefined && end !== undefined) {
        var auxArray = [];
        for (var a = 0; a < array.length; a++) {
            if (a >= start && a < end)
                auxArray[auxArray.length] = array[a];
        }
        return auxArray;
    } else if (start !== undefined) {
        var auxArray = [];
        for (var a = 0; a < array.length; a++) {
            if (a >= start)
                auxArray[auxArray.length] = array[a];
        }
        return auxArray;
    }
}