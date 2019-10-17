// (ESTO ES EL BUSINESS) LLAMADA A XHR EN FORMATO JSON .. TE DA LA PAGINA EN DETALLE DE UN PATO SOLO
function retrieveDuck(id, callback) {
    call('GET', 'https://duckling-api.herokuapp.com/api/ducks/' + id, callback);
    
};