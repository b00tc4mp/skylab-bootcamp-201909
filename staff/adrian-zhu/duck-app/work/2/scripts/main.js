// presentation

(function firstDucks() {
    
    searchDucks('', function(ducks){
        ducks = ducks.shuffle().splice(0, 4);
        paintResults(ducks)
    })


})();


function Search(container) {
    this.__container__ = container; 
}

Search.prototype.onSubmit = function (expression) {
    this.__container__.addEventListener('submit', function (event) {
        event.preventDefault()
        
        var duckQuery = document.getElementsByClassName('uploaded__input')[0];
        var url = duckQuery.value;
        expression(url);
    });
};

var search = new Search(document.getElementsByClassName('uploaded')[0]); 
search.onSubmit(listDucks);  // listDucks.


function listDucks(query) {       
    searchDucks(query, paintResults); // quitar ducks ?
};

function Results(container) {
    this.__container__ = container;
    container.innerHTML = '';
    
}

function ResultItem(container) {
    this.__container__ = container;
    //container.classList.add('results__item');
}

Results.prototype.render = function (ducks) {
    this.__container__.innerHTML = '';

    ducks.forEach(function (duck) {
        var result = new ResultItem(document.createElement('li'));
        result.render(duck);

        this.__container__.append(result.__container__); // ul append li
    }.bind(this));
};

ResultItem.prototype.render = function (duck) {
    var item = document.createElement('a');
    item.classList.add('item');

    var div = document.createElement('div');
    var link = document.createElement('a')
    var title = document.createElement('h3');
    var img = document.createElement('img');
    var price = document.createElement('p');
    

    link.addEventListener('click', function(e){

        searchDetailDuck(duck.id, paintDetail)});
        

    title.innerText = duck.title;
    img.src = duck.imageUrl;
    price.innerText = duck.price;

    // results.classList.add = 
    // div.classList.add = 
    // link.classList.add = 
    // title.classList.add = z
    // img.classList.add = 
    // price.classList.add = 

    link.append(title, img, price);
    div.append(link)

    this.__container__.append(div); // li apapend div
};

var results = new Results(document.getElementsByClassName('results')[0]);

function paintResults(ducks) {
    results.render(ducks); // pintar todo 
}

function Detail(container) {
    this.__container__ = container;
}

Detail.prototype.render = function (duck) {
    var title = this.__container__.getElementsByClassName('details__title')[0];
    title.innerText = duck.title;

    var image = this.__container__.getElementsByClassName('details__image')[0];
    image.src = duck.imageUrl;

    var description = this.__container__.getElementsByClassName('details__description')[0];
    description.innerText = duck.description;

    var store = this.__container__.getElementsByClassName('details__combination-store')[0];
    store.href = duck.link;

    var price = this.__container__.getElementsByClassName('details__combination-price')[0];
    price.innerText = duck.price;

    var back = this.__container__.getElementsByClassName('details__combination-back')[0];
    back.addEventListener('click', function(e) {
        var views = document.getElementsByClassName('view');

        views[0].classList.remove('hide');
        views[1].classList.add('hide');
    });
};

function paintDetail(duck) {
    var detail = new Detail(document.getElementsByClassName('details')[0]);
    detail.render(duck);

    var views = document.getElementsByClassName('view');

    views[0].classList.add('hide');
    views[1].classList.remove('hide');
}

