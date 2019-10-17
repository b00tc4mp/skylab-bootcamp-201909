var main = document.getElementsByClassName("main__initial")[0];
var details = document.getElementsByClassName("main__details")[0];
var footer = document.getElementsByClassName("footer")[0];
var form = document.getElementsByClassName("nav__search")[0];

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
    var detail = document.getElementsByClassName("details")[0];
    detail.getElementsByClassName("details__title")[0].innerText = duck.title
    detail.getElementsByClassName("pricetag")[0].innerText = duck.price
    detail.getElementsByClassName("details__img")[0].src = duck.imageUrl
    detail.getElementsByClassName("details__description")[0].innerText = duck.description

    document.getElementsByClassName("main__details")[0].classList.toggle('hidden'); 
    document.getElementsByClassName("main__initial")[0].classList.toggle('hidden'); 

};

// ESTO ES LA MAIN PAGE ->

duckList();

form.addEventListener("submit", function(event){
        
    event.preventDefault();
    var query = this.search.value;

    main.innerHTML= "";

    duckList(query);
    this.search.value = "";

});

function duckList (query) {
   searchDucks(query, printDucks);   
};

function duckPage (id) { 
    retrieveDuck(id, detailDuck);
};

var btn = document.getElementsByClassName("button")
btn[0].addEventListener('click', function() { duckRefresh() })

function duckRefresh () { 
    document.getElementsByClassName("main__details")[0].classList.toggle('hidden'); 
    document.getElementsByClassName("main__initial")[0].classList.toggle('hidden'); 
    duckList()
};

// THE FINAL EXECUTION !! 
// 1) FIRST BLOCK THAT GENERATES THE COMPLETE DUCK LIST

// 2) EXECUTED FUNCTION WHEN AN INPUT IS WRITTEN INSIDE THE SEARCH BAR

// 3) SINGLE ITEM PAGE, WE ARRIVE BY CLICKING IN ONE IMAGE ITEM(ID) FROM THE LIST
// 4) FUNCTION THAT LETS US REFRESH THE PAGE AND SEE AGAIN THE INITIAL FULL LIST OF DUCKS