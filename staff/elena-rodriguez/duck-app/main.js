var form = document.getElementsByClassName('header__form')[0];
var main = document.getElementsByClassName('main')[0];
var color = document.getElementsByClassName('header__form-search')[0];

form.addEventListener('submit', function (e) {

    e.preventDefault()
    main.innerHTML = '';
    var xhr = new XMLHttpRequest;

    xhr.open('GET', 'https://duckling-api.herokuapp.com/api/search?q=' + color.value);

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            var ducks = JSON.parse(xhr.responseText);

            var ul = document.createElement('ul');
            ul.classList.add("duck-list");


            ducks.forEach(function (duck) {
                var li = document.createElement('li');
                li.classList.add("duck-list__item");

                var img = document.createElement('img');
                img.classList.add("duck__image");
                img.src = duck.imageUrl;


                var h2 = document.createElement('h2');
                h2.classList.add("duck__title");
                h2 = duck.title;


                var p = document.createElement('p');
                p.classList.add("duck__price");
                p = duck.price;

                var article = document.createElement("article")
                article.classList.add("duck")

                var link = document.createElement('a');
                link.classList.add("duck-list__item-link");
                link.addEventListener('click', function (e) {
                    detalle(duck.id);
                });
                
                

                article.append(h2);
                article.append(img);
                article.append(p);

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

            var img = document.createElement('img');
            img.classList.add("duck-list__item-image");
            img.src = duck.imageUrl;

            var h2 = document.createElement('h2');
            h2.classList.add("duck-list__item-title");
            h2 = duck.title;


            var p = document.createElement('p');
            p.classList.add("duck-list__item-price");
            p = duck.price;

            var description = document.createElement('p');
            description.classList.add("duck-list__item-description");
            description = duck.description;

            var boton = document.createElement('button');
            boton.classList.add("duck-list__button");
            boton.innerText= "back";
            boton.addEventListener('click' , function (e){
                comeBack();

            })

            var article = document.createElement('article');
            article.classList.add("duck-list__item");

            article.append(h2);
            article.append(img);
            article.append(description);
            article.append(p);
            article.append(boton);

            main.append(article);
        }
    }
    xhr.send();
}

var comeBack = function() {
    main.innerHTML = '';
}