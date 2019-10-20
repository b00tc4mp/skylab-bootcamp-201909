
//está definida más adelante
// listInitialRandomDucks();


/*Función constructora, con el parametro container. 
Lo que hace es crear un objeto padre 'search' y le añade 
una propiedad __container__ que será igual al parámetro pasado.
Esto se heredará cada vez que creemos un nuevo objeto hijo de search.*/ 
function Search(container) {
    this.__container__= container;
}

/*Le añadimos un método a la función constructora Search, 
y no lo hemos hecho antes porque los métodos no tienen herencia y no se heredarían a los hijos. 
Para que se hereden, hay que crearlos mediante prototype. 
El método es onSubmit y ejecuta una función(con un argumento) que añade a la 
propiedad _container_ un addEventListener,que haga cosas al hacer submit*/
Search.prototype.onSubmit = function (expression) {
    this.__container__.addEventListener('submit', function (event) {
        event.preventDefault(); //hace que no se repita 

        var query = this.query.value; //asigna la variable query a lo que escribimos en el formulario. 

        expression(query); // Ejecuta una función X a la que le pasamos la query.  
    });
};

//declaramos un nuevo objeto search y su container ahora es nuestro form
var search = new Search(document.getElementsByClassName('header__form')[0]);
/*a este objeto le hacemos el onSubmit antes explicado y le pasamos 
listSearchResults como argumento, con lo cual, al final de la función, 
listSearchResults se ejecuta, y lo que hace es buscarnos una lista de los 
resultados que cumplen lo que la query marca.*/ 
search.onSubmit(listSearchResults); //la definiremos después
 
 //definimos la función para sacar los patos random al principio.
(function listInitialRandomDucks() {
    /*lo que hace es lanzar searchDucks con query vacía, 
    y le aplica a todo ducks una shuffle(vease archivo shuffle)*/
    searchDucks('', function (ducks) {
        ducks = ducks.shuffle().splice(0,3);
    //luego nos ejecuta paintResults--> vease más adelante
        paintResults(ducks);
    });
})();

/* función que te hace la lista de los resultados y te los imprime.
Le pasamos como argumento el valor introducido en el form, y nos ejecuta
una búsqueda de los patos con ese parámetro y además nos ejecuta printResults, 
que no hace más que sacarnos los patos en pantalla. */
function listSearchResults(query) {
    searchDucks(query, paintResults);
}

/*Función constructora.
Si nos fijamos, paintResults solo nos llamará a results.render, 
por eso hay que crear Results. Le asignamos un container y lo vaciamos. */

function Results(container) {
    this.__container__ = container;
    container.innerHTML = '';
}

/*le añadimos a la constructora un método llamado render que ...
    1. inicialmente te vacía el container*/

    /* 2. Luego recorremos todo ducks. Le ejecutamos una función que coge como 
parámetro 'duck' como podría ser singleItem o singleduck. Nos generamos una nueva 
variable llamada result, que es un objeto hijo del padr resultItem (definido más adelante) 
y le creamos un li en el HTML.
Es decir, lo que haemos es crear nuevos elementos li para cada una de las iteraciones. */
    
    
/*con esto queremos que del container principal cuelguen los li.*/
        /*el problem es que nuestro this inicial no apunta al global, 
    por eso hay que hacer bind?*/

Results.prototype.render = function (ducks) {
    this.__container__.innerHTML = '';

    ducks.forEach(function (duck) {
        var result = new ResultItem(document.createElement('li'));
        result.render(duck);

        this.__container__.append(result.__container__);
    }.bind(this));
};

var ul = document.createElement('ul');
ul.classList.add('duck-list');

var ducks = document.getElementsByClassName("ducks")[0];

ducks.append(ul);
var results = new Results(ul);


/*función constructora de resultItem. 
Lo único es que le especifica un container y una clase. */
function ResultItem(container) {
    this.__container__ = container; 
    container.classList.add('results__item');
}

ResultItem.prototype.render = function (duck) {
    var item = document.createElement('a');
    item.classList.add('item');

    item.addEventListener('click', function (event) {
        var id = duck.id;

        retrieveDuck(id, paintDetail);
    });


var title = document.createElement('h2');
title.classList.add('duck-list__title');
title.innerText = duck.title;


var image = document.createElement('img');
image.classList.add('duck-list__image');
image.src = duck.imageUrl;


var price = document.createElement('span');
price.classList.add('duck-list__price');
price.innerText = duck.price;

item.append(title, image, price);

this.__container__.append(item);

};


//paintResults nos lleva directamente a results.render. 
function paintResults(ducks) {
    results.render(ducks);
}

function Detail(container) {
    this.__container__ = container;
}

Detail.prototype.render = function (duck) {
    const title = document.getElementsByClassName("detail__title")[0];
    title.innerText = duck.title;

    const image = document.getElementsByClassName("detail__image")[0];
    image.src = duck.imageUrl;

    // var back = document.createElement('button');
    // back.classList.add('duck-list__button');
    // back.innerText = 'Back';
    // back.addEventListener('click' , function (event) {
    //     var views = document.getElementsByClassName('main')[0];
    
    const description = document.getElementsByClassName("detail__description")[0];
    description.innerText = duck.description;

    const price = document.getElementsByClassName("detail__price")[0];
    price.innerText = duck.price;

    const back = document.getElementsByClassName("detail__button")[0];
    back.addEventListener('click' , function (event) {
        var views = document.getElementsByClassName('main')[0];
        views.children[0].classList.remove('hide');
        views.children[1].classList.add('hide');
    });     

    const store = document.getElementsByClassName("detail__store")[0];
    store.href = duck.link;
       
};


function paintDetail(duck) {

    var detail = new Detail(document.getElementsByClassName('detail')[0]);
    detail.render(duck);

    var views = document.getElementsByClassName('main')[0];

    views.children[0].classList.add('hide');
    views.children[1].classList.remove('hide');
};

    



