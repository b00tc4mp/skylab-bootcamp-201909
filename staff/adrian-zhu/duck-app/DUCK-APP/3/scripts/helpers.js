function call(method, url, callback) { //14. los nombres de los parametro hay que ser mismo para que nested function los pueden escoger también com sus parametros

    fetch(method, url, function (response) { // 4. aquí activa la función fetch que recoge el method de open función ('GET'/'POST), un url(direción de API) y un callback (para saber si funciona)

    // 8. pq hacesmos callback funciton(response) ? pq pasamos un parametero y lo que queremos conseguir es que esta función sea activa inmediatamente cuando lo necesitamos; (forma asynchronist)

        if (response.readyState == 4 && response.status == 201) {
            
            // 11. readyState == AJAX / status == HTTP

            var results = JSON.parse(response.responseText); // 14. guardamos el array a este variable

            callback(results); // 10. response se refiere a this y se indica a xhr, por el cuál es el request;

            // 12. este callback de call se refiere a lo que quieres tener en el final de la función; Mientras que callback lo que quiere conseguir es conseguir el objecto de callback => que la resupuesta de este callback es THIS la localidad de xhr

            // 13. formar corchete y string que forma una array con objectos
    })
}

