var xhr = new XMLHttpRequest;

xhr.open('GET', 'https://duckling-api.herokuapp.com/api/search');

xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 201) {
        var ducks = JSON.parse(xhr.responseText);

        ducks = ducks.shuffle().splice(0, 3);

        var results = document.getElementsByClassName('results')[0];
        results.innerHTML = '';

        ducks.forEach(function (duck) {
            var result = document.createElement('li');
            result.classList.add('duck');
            result.classList.add('duck-list');


            var item = document.createElement('a');
            item.classList.add("duck-list__item-link"); 
            item.addEventListener('click', function (event) {
                var id = duck.id;

                var xhr = new XMLHttpRequest;

                xhr.open('GET', 'https://duckling-api.herokuapp.com/api/ducks/' + id);

                xhr.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 201) {
                        var duck = JSON.parse(xhr.responseText);

                        var detail = document.getElementsByClassName('detail')[0];
                        detail.classList.add('duck');
                        detail.classList.add('duck-list');
                        
                        var title = detail.getElementsByClassName('detail__title')[0];
                        title.innerText = duck.title;
                        title.classList.add("duck-list__item-title");

                        var img = detail.getElementsByClassName('detail__image')[0];
                        img.src = duck.imageUrl;
                        img.classList.add("duck-list__item-image");

                        var description = detail.getElementsByClassName('detail__description')[0];
                        description.innerText = duck.description;

                        var store = detail.getElementsByClassName('detail__store')[0];
                        store.href = duck.link;

                        var price = detail.getElementsByClassName('detail__price')[0];
                        price.innerText = duck.price;
                        price.classList.add("duck-list__item-price");

                        var back = detail.getElementsByClassName('detail__back')[0];

                        back.addEventListener('click', function (event) {
                            var views = document.getElementsByClassName('view');

                            views[0].classList.toggle('hide');
                            views[1].classList.toggle('hide');
                        });

                        var views = document.getElementsByClassName('view');

                        views[0].classList.toggle('hide');
                        views[1].classList.toggle('hide');
                    }
                };

                xhr.send();
            });
            result.append(item);

            var title = document.createElement('h2');
            title.classList.add("duck-list__item-title");
            title.innerText = duck.title;

            var img = document.createElement('img');
            img.classList.add("duck-list__item-image");
            img.src = duck.imageUrl;

            var price = document.createElement('span');
            price.classList.add("duck-list__item-price");
            price.innerText = duck.price;

            item.append(title, img, price);

            results.append(result);
        });
    }
};

xhr.send();



var searchFrom = document.getElementsByClassName('nav__form')[0];
var searchInfo = document.getElementsByClassName('nav__form-search')[0];
var results = document.getElementsByClassName('results')[0];


searchFrom.addEventListener('submit', function (e) {

    e.preventDefault();
    results.innerHTML = ''; 

    var xhr = new XMLHttpRequest;
    var url = 'https://duckling-api.herokuapp.com/api/search?q=' + searchInfo.value

    xhr.open('GET', url);

    xhr.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 201) {
            var ducks = JSON.parse(xhr.responseText);

            var ul = document.createElement('ul');
            ul.classList.add("duck-list");

            ducks.forEach(function (duck) {
                var li = document.createElement('li');
                var article = document.createElement("article")
                var link = document.createElement('a');
                var img = document.createElement('img');
                var title = document.createElement("h3");
                var price = document.createElement("p");

                link.addEventListener('click', function (e) {
                    detalle(duck.id); 
                });
                title.innerText = duck.title;
                img.src = duck.imageUrl;
                price.innerText = duck.price

                article.classList.add("duck")
                li.classList.add("duck-list__item");
                link.classList.add("duck-list__item-link");
                img.classList.add("duck-list__item-image");
                title.classList.add("duck-list__item-title");
                price.classList.add("duck-list__item-price");

                article.append(title, img, price);
                link.append(article);
                li.append(link);
                ul.append(li);
            });
            results.append(ul);
        }
    };
    xhr.send();
});

function detalle(id) { 
    var xhr = new XMLHttpRequest;
    xhr.open('GET', "http://duckling-api.herokuapp.com/api/ducks/" + id)

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {

            results.innerHTML = '';
            var duck = JSON.parse(xhr.responseText);

            var article = document.createElement('article');
            var title = document.createElement("h3");
            var img = document.createElement('img');
            var description = document.createElement("p");
            var price = document.createElement("p");
            var boton = document.createElement('button');

            title.innerText = duck.title;
            img.src = duck.imageUrl;
            description.innerText = duck.description;
            price.innerText = duck.price;
            boton.innerText= "Turn back";
            boton.addEventListener('click' , function (){
                backPage();
            })

            article.classList.add("duck");
            title.classList.add("duck-list__item-title");
            img.classList.add("duck-list__item-image");
            description.classList.add("duck-list__item-description");
            price.classList.add("duck-list__item-price");
            boton.classList.add("duck-list__button");

            article.append(title, img ,description, price, boton);
            results.append(article);
            
        }
    }
    xhr.send();
}
var backPage = function() {
    results.innerHTML = '';
}