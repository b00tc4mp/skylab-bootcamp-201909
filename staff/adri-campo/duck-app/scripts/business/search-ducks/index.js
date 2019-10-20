// (ESTO ES EL BUSINESS) LLAMADA A XHR EN FORMATO JSON .. USAR LA SEARCH BAR SIN NADA O -> AÑADIR LA QUERY (FILTRAR EN LA BARRA SEARCH)
function searchDucks(query, callback) {
    call('GET', query ? 'https://duckling-api.herokuapp.com/api/search?q=' + query : 'https://duckling-api.herokuapp.com/api/search', '', callback);
};  