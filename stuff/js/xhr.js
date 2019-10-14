// 1

var xhr = new XMLHttpRequest;

xhr.open('GET', 'https://www.google.es/search?query=hola+mundo');

xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       console.log(xhr.responseText);
    }
};

xhr.send();

// 2

var xhr = new XMLHttpRequest;

xhr.open('GET', 'https://duckling-api.herokuapp.com/api/search?q=green');

xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 201) {
       console.log(xhr.responseText);
    }
};

xhr.send();

// 3

var xhr = new XMLHttpRequest;

xhr.open('GET', 'https://duckling-api.herokuapp.com/api/ducks/5c3853aebd1bde8520e66e3e');

xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 201) {
       console.log(xhr.responseText);
    }
};

xhr.send();
