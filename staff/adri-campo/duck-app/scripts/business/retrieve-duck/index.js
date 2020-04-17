// (ESTO ES EL BUSINESS) LLAMADA A XHR EN FORMATO JSON .. TE DA LA PAGINA EN DETALLE DE UN PATO SOLO
function retrieveDuck(id, callback) {
    if (typeof id !== 'string') throw new TypeError(id +  ' is not a string');
    if (typeof callback !== 'function') throw new TypeError(callback +  ' is not a function');

    call('GET', 'https://duckling-api.herokuapp.com/api/ducks/' + id, '', function (result) {
        result.error ? callback(new Error(result.error)) : callback(result);
    });
}