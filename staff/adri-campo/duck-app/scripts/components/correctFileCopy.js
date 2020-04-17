var main = document.getElementById("main_selection");
var footer = document.getElementsByClassName("footer")
var form = document.getElementById("form");

// ESTO SON FUNCIONES CON CALLBACKS

// LISTA DE TODOS LOS PATOS
function printDucks (ducks) {
    var ul = document.createElement('ul');
    ul.classList.add("list")
    main.append(ul);

    ducks.forEach(function(duck) {
        var link = document.createElement('a');
        link.classList.add('duckinfo__link');
        link.classList.add('gridduck');
        link.addEventListener('click', function() { duckPage(duck.id) })

        var li = document.createElement('li');
        li.classList.add('duckinfo__li')
        li.append(link);

        var img = document.createElement('img');
        var h2 = document.createElement('h2');
        var p = document.createElement('p');

        h2.classList.add("duckinfo__title");
        link.append(h2)
        h2.innerHTML = duck.title;

        link.append(p)
        p.classList.add("duckinfo__price");
        var span = document.createElement('span');
        span.classList.add('pricetag')
        p.append(span)
        span.innerHTML = duck.price;

        li.classList.add("duckinfo");
        ul.append(li);

        img.classList.add("duckinfo__img");
        link.append(img);
        img.src = duck.imageUrl;    

    });

};
// DETALLE DE UN PATO
function detailDuck (duck) {
    main.innerHTML= "";
            
            var img = document.createElement('img');
            var h2 = document.createElement('h2');
            var p = document.createElement('p');
            var description = document.createElement('description');
            var li = document.createElement('li');
            li.classList.add('gridduck');

            var ul = document.createElement('ul');
            ul.classList.add("list")
            main.append(ul);
          
            h2.classList.add("duckinfo__title");
            li.append(h2);
            h2.innerHTML = duck.title;

            li.append(p);
            p.classList.add("duckinfo__price");

            var span = document.createElement('span');
            span.classList.add('pricetag')
            p.append(span)
            span.innerHTML = duck.price;
                
            li.classList.add("duckinfo");
            ul.append(li);

            img.classList.add("duckinfo__img");
            li.append(img);
            img.src = duck.imageUrl;    

            description.classList.add("duckinfo__description");
            li.append(description);
            description.innerHTML = duck.description
};
// (ESTO ES EL BUSINESS) LLAMADA A XHR EN FORMATO JSON .. USAR LA SEARCH BAR SIN NADA O -> AÑADIR LA QUERY (FILTRAR EN LA BARRA SEARCH)
function searchDucks(query, callback) {
    query ? query : query = ""
    var xhr = new XMLHttpRequest;
    xhr.open('GET', 'https://duckling-api.herokuapp.com/api/search?q=' + query);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            var ducks = JSON.parse(xhr.responseText);
            callback(ducks);
        }
    };
    xhr.send();
};
// (ESTO ES EL BUSINESS) LLAMADA A XHR EN FORMATO JSON .. TE DA LA PAGINA EN DETALLE DE UN PATO SOLO
function retrieveDuck(id, callback) {
    var xhr = new XMLHttpRequest;
    xhr.open('GET', 'https://duckling-api.herokuapp.com/api/ducks/' + id);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            var duck = JSON.parse(xhr.responseText);
            callback(duck);
        }
    };

    xhr.send();
};


// ESTO ES LA MAIN PAGE ->

function duckList (query) {
   searchDucks(query, printDucks);   
};

function duckPage (id) { 
    retrieveDuck(id,detailDuck);
};

var btn = document.getElementsByClassName("button")
btn[0].addEventListener('click', function() { duckRefresh() })

function duckRefresh () { 
    main.innerHTML= "";
    duckList()
};



// business (ESTO ES DE MANU)

function searchDucks(query, callback) {
    query ? query : query = "";
    url = 'https://duckling-api.herokuapp.com/api/search?q='+ query
    call('GET', url, callback);
}

function retrieveDuck(id, callback) {
    call('GET', 'https://duckling-api.herokuapp.com/api/ducks/' + id, callback);
}


// THE FINAL EXECUTION !! 
// 1) FIRST BLOCK THAT GENERATES THE COMPLETE DUCK LIST

duckList();

// 2) EXECUTED FUNCTION WHEN AN INPUT IS WRITTEN INSIDE THE SEARCH BAR

form.addEventListener("submit", function(event){
        
    event.preventDefault();
    var query = this.search.value;

    main.innerHTML= "";

    duckList(query);
    this.search.value = "";

});

// 3) SINGLE ITEM PAGE, WE ARRIVE BY CLICKING IN ONE IMAGE ITEM(ID) FROM THE LIST
// 4) FUNCTION THAT LETS US REFRESH THE PAGE AND SEE AGAIN THE INITIAL FULL LIST OF DUCKS

