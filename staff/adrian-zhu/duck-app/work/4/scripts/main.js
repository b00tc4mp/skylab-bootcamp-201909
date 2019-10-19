(function firstDucks() {
    
    searchDucks('', function(ducks){
        ducks = ducks.shuffle().splice(0, 4);
        paintResults(ducks)
    })
})();

var search = new Search(document.getElementsByClassName('uploaded')[0]); 
search.onSubmit(listDucks); 


function listDucks(query) {       
    searchDucks(query, paintResults);
};

var results = new Results(document.getElementsByClassName('results')[0]);

function paintResults(ducks) {
    results.render(ducks); 
}

results.onItemClick = function(duck) {
    var detail = new Detail(document.getElementsByClassName('details')[0]);
    detail.render(duck);

    var views = document.getElementsByClassName('view');

    views[0].classList.add('hide');
    views[1].classList.remove('hide');
}