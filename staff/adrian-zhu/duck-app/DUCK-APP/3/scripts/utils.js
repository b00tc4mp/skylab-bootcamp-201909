function fetch(method, url, callback) {
    var xhr = new XMLHttpRequest;

    xhr.open(method, url);

    xhr.onreadystatechange = function () {
        callback(this); 

        // 1. lo que nos guarda es una función => que hace ? gestiona la respuesta dentro de esa funcion recuperaremos,  la respuesta tanto si ha ido mal o bien; // entonce que es el callback ? la función que corre todo estos;

        // 2. pq usamos callback en vez de return ? pq return funciona synchronist y callback puede funcionar como asynchronist
        // 3. pq this ?  ya que queremos aplicarlo para el mismo xhr y no otras funciones

        // 5. vemos que este this llega a call función de helpers.js, ya que es la función que hemos pasado como parametro como principio;

        // 6. Es decir cuando activamos la función call, salta a fetch y luego vuelve a call; 

        // 7. response de callback function(response), corresponde al callback;

        // 9. callback de call función sirve para demostrar los datos

        // 11. pq this ?

        
    };

    xhr.send();
}