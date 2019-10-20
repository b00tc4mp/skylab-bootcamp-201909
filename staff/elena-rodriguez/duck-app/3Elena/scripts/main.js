listInitialRandomDucks();

var search = new Search(document.getElementsByClassName('header__form')[0]);
search.onSubmit(listSearchResults);
 
function listInitialRandomDucks() {
    searchDucks('', function (ducks) {
        ducks = ducks.shuffle().splice(0,3);

        paintResults(ducks);
    });
};


function listSearchResults(query) {
    searchDucks(query, paintResults);
}

var ul = document.createElement('ul');
ul.classList.add('duck-list');
var ducks = document.getElementsByClassName("ducks")[0];
ducks.append(ul);
var results = new Results(ul);

results.onItemClick = function(duck) {
    debugger
    var detail = new Detail(document.getElementsByClassName('detail')[0]);
    detail.render(duck);

    var views = document.getElementsByClassName('main')[0];
    views.children[0].classList.add('hide');
    views.children[1].classList.remove('hide');
};


function paintResults(ducks) {
    results.render(ducks);
}

    

