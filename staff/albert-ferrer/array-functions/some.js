/**
 * 
 * 
 * @param {*} array 
 * @param {*} expression 
 */


function some(array,expression){
    for (var i=0; i < array.length; i++){
        if(expression(array[i])) {
            return true;
        } else {
            return false;
        };
    };
};

