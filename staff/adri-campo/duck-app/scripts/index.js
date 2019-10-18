var main = document.getElementsByClassName("main__initial")[0];
var details = document.getElementsByClassName("main__details")[0];
var footer = document.getElementsByClassName("footer")[0];
var form = document.getElementsByClassName("nav__search")[0];

// ESTO ES LA MAIN PAGE ->

var login = new Login(document.getElementsByClassName('main__loginForm')[0]);
login.onSubmit();

duckList();

var search = new Search(document.getElementsByClassName('nav__search')[0]);
search.onSubmit(duckList);

function duckList (query) {
   searchDucks(query, printDucks);   
};

var results = new Results(document.getElementsByClassName('list')[0]);

function printDucks (ducks) {
    results.render(ducks);
};

function duckPage (id) { 
    var detail = new Detail (document.getElementsByClassName("details")[0]);
    retrieveDuck(id, detail.render); // poner detailduck(error,duck) { if (error) else}
};

var btn = document.getElementsByClassName("button")
btn[0].addEventListener('click', function() { duckRefresh() })

function duckRefresh () { 
    document.getElementsByClassName("main__details")[0].classList.add('hidden'); 
    document.getElementsByClassName("main__initial")[0].classList.remove('hidden'); 
    document.getElementsByClassName("nav__search")[0].classList.remove('hidden'); 
    document.getElementsByClassName("main__loginForm")[0].classList.add('hidden'); 

};