function splice(array, start, end, newElements) {
    var auxArray = [];
    if (array !== undefined && start !== undefined && end !== undefined && newElements !== undefined) {


    } else if (array !== undefined && start !== undefined && end !== undefined) {

    } else if (array !== undefined && start !== undefined) { //this zone works properly
        if (start < array.length) {
            var index = 0;
            for (var a = start; a < array.length; a++) {
                auxArray[index] = array[a];
                index++;
            }
            array.length = Math.abs(start - array.length) - 1;
        }

        return auxArray;
    } else {

    }



}

var array = [1, 2, 3, 4, 3, 2, 1];
console.log(splice(array, 3));