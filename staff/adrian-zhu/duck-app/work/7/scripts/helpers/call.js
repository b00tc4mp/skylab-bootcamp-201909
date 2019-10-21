function call(method, url, body, callback) {
    let headers = {} // COMO HEADER DE HTML 

    // debugger 
    // PASAR BODY A HEADER

    if (body) headers['Content-Type'] = 'application/json;charset=UTF-8' // PASAR USERNAME + PASSWORD QUE SERÁ EN FORMATO DE JSON Y EN FORMA DE CHARSET = UFT-8 => CONTENT-TYPE ESTÁ EN EL HEADER KEY, Y APPLICACIÓN TAMBIÉN SE PUEDE VER EN EL HEADER VALUE;
    if (body.token) headers['Authorization'] = 'Bearer '+body.token;
    // RETRIEVE PASA ID, PASA BEARER-TOKEN- AUTHORIZATION GOOGLE;

    fetch(method, url, headers, body, function (response) {
        if (response.readyState == 4) {
            var result = JSON.parse(response.responseText); 

            callback(result);
        }
    });
}