// business
​
function searchDucks(query, callback) {
    query ? query : query = "";
    url = 'https://duckling-api.herokuapp.com/api/search?q='+ query
    call('GET', url, callback);
}
​
function retrieveDuck(id, callback) {
    call('GET', 'https://duckling-api.herokuapp.com/api/ducks/' + id, callback);
}

// ... 

call('GET', 'https://duckling-api.herokuapp.com/api/search?q=green', console.log)

function call(method, url, callback) {
    fetch(method, url, function (response) {
        if (response.readyState == 4 && response.status == 201) {
            var results = JSON.parse(response.responseText);
            callback(results);
        }
    });
 }

function fetch(method, url, callback) {
    var xhr = new XMLHttpRequest;
    xhr.open(method, url);
    xhr.onreadystatechange = function () {
        callback(this);
    };
    xhr.send();
 }

 