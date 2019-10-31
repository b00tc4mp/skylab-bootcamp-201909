/**
 * Returns a valid key composed by 4 numbers given a shorter invalid key, by adding 0 at the begining of the string.
 * 
 * @param {key} string Original key.
 * */
 
function videoUrl (key){
    while (key.length<4){
        key='0'+key
    }
    return key
}