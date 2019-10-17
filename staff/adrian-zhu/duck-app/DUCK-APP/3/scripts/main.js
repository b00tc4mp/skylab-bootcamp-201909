listInitialRandomDucks(); // 17. entra función 

var search = new Search(document.getElementsByClassName('search')[0]);
search.onSubmit(listSearchResults); 

function listInitialRandomDucks() {
    searchDucks('', function (ducks) {
        ducks = ducks.shuffle().splice(0, 3);

        paintResults(ducks);
    }); //19. escoger las informaciones randomly
}

function listSearchResults(query) {
    searchDucks(query, paintResults); // 18. entra aquí y luego va a business search-ducks - index.js => y va a call - fetch - call y la llamada está hecha => 
}

var results = new Results(document.getElementsByClassName('results')[0]); //20. entra aquí, y a partir de aquí consigue a prototype Results, vamos components result.js 

// 20.5 pq hacemos new ? para crear una instancia por cuál comparte o lleva ciertas metodos o propiedades que nos interesa a desarrollar en el futuro 

results.onItemClick = function(duck) {
    var detail = new Detail(document.getElementsByClassName('detail')[0]);
    detail.render(duck);

    var views = document.getElementsByClassName('view');

    views[0].classList.add('hide');
    views[1].classList.remove('hide');
};

function paintResults(ducks) {
    results.render(ducks);
}