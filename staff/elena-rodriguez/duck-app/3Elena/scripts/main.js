(function () {
    searchDucks('', function (ducks) {
        ducks = ducks.shuffle().splice(0, 3);

        results.render(ducks);
    });
})();

var search = new Search(document.getElementsByClassName('header__form')[0]);
search.onSubmit(function (query) {
    searchDucks(query, results.render); // NOTE it works thanks to the internal binding that takes place in Results constructor (SEE file)
    // searchDucks(query, results.render.bind(results)); // NOTE alternative to previous
    // searchDucks(query, function(ducks) { // NOTE alternative to previous
    //     results.render(ducks);
    // });
});

var ul = document.createElement('ul');
ul.classList.add('duck-list');
var ducks = document.getElementsByClassName("ducks")[0];
ducks.append(ul);
var results = new Results(ul);

results.onItemRender = function () {
    var item = new ResultItem(document.createElement('li'));

    item.onClick = function (id) {
        retrieveDuck(id, function (duck) {
            var detail = new Detail(document.getElementsByClassName('detail')[0]);

            detail.onBack = function () {
                var views = document.getElementsByClassName('main')[0];
                views.children[0].classList.remove('hide');
                views.children[1].classList.add('hide');
            };

            detail.render(duck);

            var views = document.getElementsByClassName('main')[0];

            views.children[0].classList.add('hide');
            views.children[1].classList.remove('hide');
        })
    }


}
 
function listInitialRandomDucks() {
    searchDucks('', function (ducks) {
        ducks = ducks.shuffle().splice(0,3);

        paintResults(ducks);
    });
};

function listSearchResults(query) {
    var views = document.getElementsByClassName('main')[0];
    views.children[0].classList.remove('hide');
    views.children[1].classList.add('hide');
    searchDucks(query, paintResults);
}



results.onItemClick = function(duck) {

    var detail = new Detail(document.getElementsByClassName('detail')[0]);
    detail.render(duck);

    var views = document.getElementsByClassName('main')[0];
    views.children[0].classList.add('hide');
    views.children[1].classList.remove('hide');
};


function paintResults(ducks) {
    results.render(ducks);
}

    

