//cogemos los items del html que nos interesan (formulario, main container y el color que le pasaremos al buscador)
var form = document.getElementsByClassName('header__form')[0];
var main = document.getElementsByClassName('main')[0];
var color = document.getElementsByClassName('header__form-search')[0];

// le añadimos comportamiento al form.
form.addEventListener('submit', function (e) {
// con submit, si el último elemento del form es un button, es como hacer un onclick, pero además funciona también con la tecla enter. 
    e.preventDefault() // con esto paramos el bubbling?
    main.innerHTML = ''; // limpiamos el main
    var xhr = new XMLHttpRequest; //creamos una petición en Ajax

    //abrimos la petición, con un get, junto con el value del color (sólo color tiene muchas propiedades)
    xhr.open('GET', 'https://duckling-api.herokuapp.com/api/search?q=' + color.value);

    //onready... viene a decir.. si hay cambios en el state..
    xhr.onreadystatechange = function () {
        //si el state es 4, y el status es 201 (que viene a ser todo OK...)
        if (this.readyState == 4 && this.status == 201) {
            //me devuelve los patitos que tienen color.value especificado, en un JSON.
            //nota. el responsetext solo lo devuelve como un string y la info es un caos. JSON nos lo transforma y muestra como un objeto. 
            var ducks = JSON.parse(xhr.responseText);
            //creo una ul (lista contenedor) donde iré metiendo los datos recibidos.
            var ul = document.createElement('ul');
            //le asigno un nombre de lista a ese contenedor.
            ul.classList.add("duck-list");

            //recorro los patos recibidos
            ducks.forEach(function (duck) {
                //creo un item de la lista y le añado nombre
                var li = document.createElement('li');
                li.classList.add("duck-list__item");

                //creo imagen y le pongo la url del pato
                var img = document.createElement('img');
                img.classList.add("duck-list__item-image");
                img.src = duck.imageUrl;

                //creo h2  y le pongo el title del pato
                
                var h2 = document.createElement("h2");
                var text = document.createTextNode(duck.title);
                h2.classList.add("duck-list__item-title");
                h2.appendChild(text);

                //creo p y le pongo el precio
                var p = document.createElement("p");
                var price = document.createTextNode(duck.price)
                p.classList.add("duck-list__item-price");
                p.appendChild(price);
                
                //creo article contenedor
                var article = document.createElement("article")
                article.classList.add("duck")

                //creo link
                var link = document.createElement('a');
                link.classList.add("duck-list__item-link");
                //le doy funcionalidad a ese link, para que al clickar, me pase al detalle del pato.
                link.addEventListener('click', function (e) {
                    detalle(duck.id); // llamo a la función detalle con el id del pato en cuestión.
                });
                
                
                //cuelgo h2, img y p de article
                article.append(h2);
                article.append(img);
                article.append(p);
                //cuelgo article de link
                link.append(article);
                //cuelgo link de li
                li.append(link);
                //cuelgo li de ul
                ul.append(li);


            });
            //cuelgo ul de main, fuera del foreach.
            main.append(ul);
        }
    };
    //supongo que enviamos la petición
    xhr.send();
});

//funcinalidad para cuando accedemos a detalle
function detalle(id) { //le pasamos el id como argumento
    var xhr = new XMLHttpRequest;
    //abrimos el patito en cuestión, con su id.
    xhr.open('GET', "http://duckling-api.herokuapp.com/api/ducks/" + id)
    // lo mismo... si está ready...
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            main.innerHTML = '';
            var duck = JSON.parse(xhr.responseText);

            var img = document.createElement('img');
            img.classList.add("duck-list__item-image");
            img.src = duck.imageUrl;

            var h2 = document.createElement("h2");
            var duckTitle = document.createTextNode(duck.title)
            h2.classList.add("duck-list__item-title");
            h2.appendChild(duckTitle);

            var p = document.createElement("p");
            var price = document.createTextNode(duck.price)
            p.classList.add("duck-list__item-price");
            p.appendChild(price);

            //añadimos descripción
            var paragraph = document.createElement("p");
            var description = document.createTextNode(duck.description)
            paragraph.classList.add("duck-list__item-description");
            paragraph.appendChild(description);
            
            //añadimos boton de comeback y le pasamos una función
            var boton = document.createElement('button');
            boton.classList.add("duck-list__button");
            boton.innerText= "back";
            boton.addEventListener('click' , function (e){
                comeBack();

            })
            //creamos article sección para colgar los demás items
            var article = document.createElement('article');
            article.classList.add("duck");
            //colgamos título, img, descripción, precio y boton de article
            article.append(h2);
            article.append(img);
            article.append(paragraph);
            article.append(p);
            article.append(boton);
            //colgamos article de main  
            main.append(article);
        }
    }
    //enviamos 
    xhr.send();
}
//definimos función comeBack, que simplemente nos limpia el main. 
var comeBack = function() {
    main.innerHTML = '';
}