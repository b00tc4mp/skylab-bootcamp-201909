function Search(container) {
    this.__container__= container;
}

Search.prototype.onSubmit = function (expression) {
    this.__container__.addEventListener('submit', function (event) {
        event.preventDefault(); //hace que no se repita 

        var query = this.query.value; //asigna la variable query a lo que escribimos en el formulario. 

        expression(query); // Ejecuta una función X a la que le pasamos la query.  
    });
};