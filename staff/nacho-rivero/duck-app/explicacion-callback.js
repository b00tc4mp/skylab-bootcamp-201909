// logic
function hello(name, callback) {
    callback(name);
}

// presentation
hello('pepito', function(name){
    console.log(name);
});

hello('pepito', function(name){
    console.log(name + 'hello!')
})

var a;

hello('nacho', function(name) {
    a = name;
})

/**
 * EJEMPLO 2
 */

function fetch(method, url, callback) {
    var xhr = new XMLHttpRequest;

    xhr.open(method, url);

    xhr.onreadystatechange = function () {
        callback(this);
    };

    xhr.send();
}

function call(method, url, callback) {
    fetch(method, url, function (response) {
        if (response.readyState == 4 && response.status == 201) {
            var results = JSON.parse(response.responseText);

            callback(results);
        }
    });
}

// logic
function retrievePatos(query, callback) {
    call('GET', 'https://www.google.com/search?q=' + query, callback);
}

function retrieveFutbolistas(query, callback) {
    call('GET', 'https://es.search.yahoo.com/search?p=' + query, callback);
}

function retrieveCoches(query, callback) {
    call('GET', 'https://duckduckgo.com/?q=' + query, callback);
}

// presentation

retrievePatos('black', function(ducks){
    console.log(ducks);
})
retrieveFutbolistas('black', function(futbolistas){
    console.log(futbolistas);
})
retrieveCoches('black', function(coches){
    console.log(coches);
})
