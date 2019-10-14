/**
 * method fills (modifies) all the elements of an array from a start
 *  index (default zero) to an end index (default array length) with a
 *  static value. It returns the modified array.
 * 
 * @param {*} array Array to modify 
 * @param {*} value value to insert in each element
 * @param {*} start where start to modify the array
 * @param {*} end  where stop to modify the array
 * @throws {TypeError} When array is not defined
 */
function fill(array, value, start, end) {
    if (value !== undefined || value !== null) throw TypeError(array + " is not defined");

    if (start === undefined || start === null) {
        for (var a = 0; a < array.length; a++)
            array[a] = value;
    } else if (start !== undefined && end !== undefined) {
        for (var a = start; a < end; a++)
            array[a] = value;
    } else {
        for (var a = start; a < array.length; a++)
            array[a] = value;
    }

}