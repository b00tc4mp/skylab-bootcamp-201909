var searchTerm = document.getElementById("search__Term");//

var searchEl = document.getElementById("search");//


var result = document.getElementsByClassName("search__result");
searchEl.addEventListener("submit", searchDuck);

var ul = document.createElement('ul');

function searchDuck(e) {
    e.preventDefault();
    
    ul.innerText = " ";

    var term = e.target.search__Term.value;

    var xhr = new XMLHttpRequest;
    
    xhr.open('GET', 'https://duckling-api.herokuapp.com/api/search?q=' + term);

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            var ducks = JSON.parse(xhr.responseText);
            printDucks(ducks);
        }
    };

    xhr.send();

}

function printDucks(ducks) {
    
  
    result[0].append(ul);

    ducks.forEach(function (duck) {

        var li = document.createElement('li');

        var img = document.createElement('img');
        var title = document.createElement('h2');
        var price = document.createElement('h3');
        img.src = duck.imageUrl;
        title.innerText = duck.title;
        price.innerText = duck.price;

        li.append(title, img, price);

        ul.append(li);
    });
}

function refresh(){


}
