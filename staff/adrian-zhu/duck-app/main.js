var input = document.getElementsByClassName('navigator_input').firstChild; //[0]
var lupa = document.getElementsByClassName('navigator_button').firstChild; //[0]
var duckbox = document.getElementsByClassName ('duck-container').firstChild; // [0];


var resultDuck;

//

lupa.addEventListener('click', function(e) (



));

var h1 = document.createElement('h1');
h1.innerText = 'Hola Mundo';

document.body.append(h1);

var xhr = new XMLHttpRequest;

xhr.open('GET', 'https://duckling-api.herokuapp.com/api/search?q=' + input.value); // option sacar URL a un variable separado

xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 201) {
       var ducks = JSON.parse(xhr.responseText); // convertidor 

        var ul = document.createElement('ul');
        document.body.append(ul);

        ducks.forEach(function(duck) {
            // ul - li - article - h3 - img - p

            var li = document.createElement('li');

            var img = document.createElement('img'); // pegar
            img.src = duck.imageUrl;

            li.append(img);

            ul.append(li);

            //
        });
        return duckcontainer // console.log
        append(ul)
    }
};

xhr.send();