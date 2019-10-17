function Results(container) {
    this.__container__ = container; // 21. container document.getElementsByClassName('results')[0]
    container.innerHTML = ''; //22. container.innerHTML = limpiar el container; results podemos entender como el resultado de xhr procesado y limpiado después de la función listInitialRandomDucks() de la línia 17;
}



Results.prototype.onItemClick = function(duck) { console.log('clicked on duck', duck); };

// 23. que hace render ? este ducks proviene de las informaciones del parametro container => duck se interpreta por cuál los casos singulares que hemos obtenido del objecto container (tenemos 3)

Results.prototype.render = function (ducks) {
    this.__container__.innerHTML = '';

    ducks.forEach(function (duck) {

        var result = new ResultItem(document.createElement('li'));          // 24. el result en este caso crea una instancia de ResultItem por cuál crea un elemento y aplica el constructor de result-item.js RECORDAR HACEMOS INSTANCIA DE CONSTRUCTOR PORQUE NOS INTERESAMOS AÑADIRLE CIERTAS METODOS Y VARIABLES;
        result.onClick = this.onItemClick;
        result.render(duck); // 25. activar el metodo ResultItem.render(duck) para cada casos de duck; => result-item.js

        this.__container__.append(result.__container__);
    }.bind(this)); 
};