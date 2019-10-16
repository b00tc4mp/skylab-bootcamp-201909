var main = document.getElementById("main_selection");
var footer = document.getElementsByClassName("footer")
// var initial = document.getElementById("main__initial");
// var search = document.getElementById("main_search");
// var details = document.getElementById("main_details");

var form = document.getElementById("form");



function duckList () {

// FIRST BLOCK THAT GENERATES THE COMPLETE DUCK LIST

        var xhr = new XMLHttpRequest;
        xhr.open('GET', 'https://duckling-api.herokuapp.com/api/search?q=');
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 201) {

                var ducks = JSON.parse(xhr.responseText);
    
                var ul = document.createElement('ul');
                ul.classList.add("list")
                main.append(ul);
            
                ducks.forEach(function(duck) {
                    var link = document.createElement('a');
                    link.classList.add('duckinfo__link');
                    link.classList.add('gridduck');
                    link.addEventListener('click', function(event) { duckPage(duck.id) })

                    var li = document.createElement('li');
                    li.classList.add('duckinfo__li')
                    li.append(link);

                    var img = document.createElement('img');
                    var h2 = document.createElement('h2');
                    var p = document.createElement('p');

                    h2.classList.add("duckinfo__title");
                    link.append(h2)
                    h2.innerHTML = duck.title;

                    link.append(p)
                    p.classList.add("duckinfo__price");
                    var span = document.createElement('span');
                    span.classList.add('pricetag')
                    p.append(span)
                    span.innerHTML = duck.price;

                    li.classList.add("duckinfo");
                    ul.append(li);

                    img.classList.add("duckinfo__img");
                    link.append(img);
                    img.src = duck.imageUrl;    

                });
            };
        };
        xhr.send();

};

// EXECUTED FUNCTION WHEN AN INPUT IS WRITTEN INSIDE THE SEARCH BAR

function duckSearch(){

        form.addEventListener("submit", function(event){
        
        event.preventDefault();
        var query = this.search.value;

        main.innerHTML= "";

        var xhr = new XMLHttpRequest;
        xhr.open('GET', 'https://duckling-api.herokuapp.com/api/search?q=' + query);
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 201) {

                var ducks = JSON.parse(xhr.responseText);
        
                var ul = document.createElement('ul');
                ul.classList.add("list")
                main.append(ul);
                
                ducks.forEach(function(duck) {
                    var link = document.createElement('a');
                    link.classList.add('duckinfo__link');
                    link.classList.add('gridduck');
                    link.addEventListener('click', function(event) { duckPage(duck.id) })

                    var li = document.createElement('li');
                    li.classList.add('duckinfo__li')
                    li.append(link);

                    var img = document.createElement('img');
                    var h2 = document.createElement('h2');
                    var p = document.createElement('p');

                    h2.classList.add("duckinfo__title");
                    link.append(h2)
                    h2.innerHTML = duck.title;

                    link.append(p)
                    p.classList.add("duckinfo__price");

                    var span = document.createElement('span');
                    span.classList.add('pricetag')
                    p.append(span)
                    span.innerHTML = duck.price;

                    li.classList.add("duckinfo");
                    ul.append(li);

                    img.classList.add("duckinfo__img");
                    link.append(img);
                    img.src = duck.imageUrl;    

                });
            };
        };

        xhr.send();

    });

};

// SINGLE ITEM PAGE, WE ARRIVE BY CLICKING IN ONE IMAGE ITEM(ID) FROM THE LIST
// document.getElementById("main__initial").style.display = 'none';
// document.getElementById("main__search").style.display = 'none';
// document.getElementById("main__details").style.display = 'block';

function duckPage (id) { 
    
    var xhr = new XMLHttpRequest;
    xhr.open('GET', 'http://duckling-api.herokuapp.com/api/ducks/' + id);
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 201) {
            main.innerHTML= "";

            var duck = JSON.parse(xhr.responseText);
            var img = document.createElement('img');
            var h2 = document.createElement('h2');
            var p = document.createElement('p');
            var button = document.createElement('button');
            var description = document.createElement('description');
            var li = document.createElement('li');
            li.classList.add('gridduck');

            var ul = document.createElement('ul');
            ul.classList.add("list")
            main.append(ul);
          
            h2.classList.add("duckinfo__title");
            li.append(h2);
            h2.innerHTML = duck.title;

            li.append(p);
            p.classList.add("duckinfo__price");

            var span = document.createElement('span');
            span.classList.add('pricetag')
            p.append(span)
            span.innerHTML = duck.price;
                
            li.classList.add("duckinfo");
            ul.append(li);

            img.classList.add("duckinfo__img");
            li.append(img);
            img.src = duck.imageUrl;    

            description.classList.add("duckinfo__description");
            li.append(description);
            description.innerHTML = duck.description 
            
            // button.classList.add("footer__button");
            // footer[0].append(button);
            // button.innerText = "HOME"


            // button.addEventListener('click', function(event) { duckRefresh() })
            
        };
    };

    xhr.send();

};

var btn = document.getElementsByClassName("button")
btn[0].addEventListener('click', function(event) { duckRefresh() })

//FUNCTION THAT LETS US REFRESH THE PAGE AND SEE AGAIN THE INITIAL FULL LIST OF DUCKS

function duckRefresh () { 

    main.innerHTML= "";
    var xhr = new XMLHttpRequest;
    xhr.open('GET', 'https://duckling-api.herokuapp.com/api/search?q=');
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 201) {

            var ducks = JSON.parse(xhr.responseText);
    
            var ul = document.createElement('ul');
            ul.classList.add("list")
            main.append(ul);
            
            ducks.forEach(function(duck) {
                var link = document.createElement('a');
                link.classList.add('duckinfo__link');
                link.classList.add('gridduck');
                link.addEventListener('click', function(event) { duckPage(duck.id) })

                var li = document.createElement('li');
                li.classList.add('duckinfo__li')
                li.append(link);

                var img = document.createElement('img');
                var h2 = document.createElement('h2');
                var p = document.createElement('p');

                h2.classList.add("duckinfo__title");
                link.append(h2)
                h2.innerHTML = duck.title;

                link.append(p)
                p.classList.add("duckinfo__price");
                p.innerHTML = duck.price;
                
                li.classList.add("duckinfo");
                ul.append(li);

                img.classList.add("duckinfo__img");
                link.append(img);
                img.src = duck.imageUrl;    

            });
        };
    };
    xhr.send();

    // div = document.createElement('div');
    // div.innerHTML = "Go back";
    // details.append(div);
    // div.addEventListener('click', function() {
    //     document.getElementById("results").style.display = 'block';
    //     document.getElementById("searching").style.display = 'block';
    //     document.getElementById("details").style.display = 'none';
   
    // });

};


duckList();




