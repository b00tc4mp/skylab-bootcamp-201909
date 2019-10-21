function fetch(method, url, headers, body, callback) {
    var xhr = new XMLHttpRequest;

    xhr.open(method, url);

    xhr.onreadystatechange = function () {
        callback(this);
    };

    if (headers) 
        for (let key in headers) // por cada header q me haga una declaración
            xhr.setRequestHeader(key, headers[key]) // MDN verificación

    body? xhr.send(JSON.stringify(body)) : xhr.send(); //  si body contiene algo envia eso, sino hace simplemente la petición 
}