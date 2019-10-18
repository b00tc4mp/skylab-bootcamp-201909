(function firstDucks() {
    var xhr = new XMLHttpRequest;

    xhr.open('GET', 'https://duckling-api.herokuapp.com/api/search?q=');

    xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 201) {
    var ducks = JSON.parse(xhr.responseText);

    ducks = ducks.shuffle().splice(0, 4);

    var results = document.getElementsByClassName('results')[0];
    results.innerHTML = '';

            ducks.forEach(function(duck) {

            var li = document.createElement('li');
            var div = document.createElement('div');
            var link = document.createElement('a')
            var title = document.createElement('h3');
            var img = document.createElement('img');
            var price = document.createElement('p');

            link.addEventListener('click', function(){detailDuck(duck.id)});

            title.innerText = duck.title;
            img.src = duck.imageUrl;
            price.innerText = duck.price;


            // results.classList.add = 
            // div.classList.add = 
            // link.classList.add = 
            // title.classList.add = 
            // img.classList.add = 
            // price.classList.add = 


            link.append(title, img, price);
            div.append(link)
            li.append(div);
            results.append(li);
            });
        }
    };
    
    xhr.send();
})();

var submit = document.getElementsByClassName('uploaded')[0];
var results = document.getElementsByClassName('results')[0];
var duckQuery = document.getElementsByClassName('uploaded__input')[0];

submit.addEventListener('submit', function(e){
e.preventDefault();
results.innerHTML = '';

var url = duckQuery.value;
listDuck(url);
})

function listDuck(query) {

searchDucks(query, function(ducks){

    ducks.forEach(function(duck) {

        var li = document.createElement('li');
        var div = document.createElement('div');
        var link = document.createElement('a');
        var title = document.createElement('h3');
        var image = document.createElement('img');
        var price = document.createElement('p');

        link.addEventListener('click', function(){detailDuck(duck.id)})
        title.innerText = duck.title;
        image.src = duck.imageUrl;
        price.innerText = duck.price;

        // results.classList.add = 
        // div.classList.add = 
        // link.classList.add = 
        // title.classList.add = 
        // img.classList.add = 
        // price.classList.add = 


        link.append(title, image, price);
        div.append(link)
        li.append(div);
        results.append(li);

    });
});
}


function detailDuck(id) {

var xhr = new XMLHttpRequest;

xhr.open('GET', 'https://duckling-api.herokuapp.com/api/ducks/' + id);

xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 201) {
        var duck = JSON.parse(xhr.responseText);

        var detail = document.getElementsByClassName('details')[0];

        var title = document.getElementsByClassName('details__title')[0];
        title.innerText = duck.title;

        var image = detail.getElementsByClassName('details__image')[0];
        image.src = duck.imageUrl;

        var description = detail.getElementsByClassName('details__description')[0];
        description.innerText = duck.description;

        var store = detail.getElementsByClassName('details__combination-store')[0];
        store.href = duck.link;

        var price = detail.getElementsByClassName('details__combination-price')[0];
        price.innerText = duck.price;

        var back = detail.getElementsByClassName('details__combination-back')[0];
        back.addEventListener('click', function (event) {
            var views = document.getElementsByClassName('view');

            views[0].classList.remove('hide');
            views[1].classList.add('hide');
        });

        var views = document.getElementsByClassName('view');

        views[0].classList.add('hide');
        views[1].classList.remove('hide');
    }
};

xhr.send();
};

function searchDucks (query, callback){

var xhr = new XMLHttpRequest;

xhr.open('GET', query ? 'https://duckling-api.herokuapp.com/api/search?q=' + query : 'https://duckling-api.herokuapp.com/api/search');

xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 201) {
        var ducks = JSON.parse(xhr.responseText);

        callback(ducks);
    }
};

xhr.send();
};