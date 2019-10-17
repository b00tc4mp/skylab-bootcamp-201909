//esta función CALL es como una herramienta.
//lo que hace es LLAMAR a otra cosa, a FETCH. 
//Recoge un método,Get. Una url, el enlace, 
//y una función tipo callback1 (que se llama en el mismo argumento):


function call(method, url, callback) {
//lo que viene  a partir de aquí SOLO ES LLAMAR A FETCH, CON COSAS INTERNAS.
    fetch(method, url, function (response) {
        //a la llamada de fetch le pasamos method y url de call, 
        //y una callback2 que coge como argumento response. 
        if (response.readyState == 4 && response.status == 201) {
        //esa callback2 nos checkea si la response está toda ok
            var results = JSON.parse(response.responseText); 
        //esa callback2 nos genera un results, que es la info bien puesta.
            callback(results);
        }
    });
}