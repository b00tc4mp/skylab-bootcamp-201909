var searchFrom = document.getElementsByClassName('nav__form')[0];
var searchInfo = document.getElementsByClassName('nav__form-search')[0];
var main = document.getElementsByClassName('main')[0];


searchFrom.addEventListener('submit', function (e) {

    e.preventDefault();
    main.innerHTML = ''; 

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
            main.append(ul);
        }
    };
    xhr.send();
});

function detalle(id) { 
    var xhr = new XMLHttpRequest;
    xhr.open('GET', "http://duckling-api.herokuapp.com/api/ducks/" + id)

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {

            main.innerHTML = '';
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
            main.append(article);
            
        }
    }
    xhr.send();
}
var backPage = function() {
    main.innerHTML = '';
}