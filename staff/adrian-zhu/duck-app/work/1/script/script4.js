    // IIFE firstDucks (queryDucks)

    (function firstDucks() {
    
        searchDucks('', function(ducks){
    
            ducks = ducks.shuffle().splice(0, 4);
            painDucks(ducks)
        })
    
    })();
    
    
    // preset DOM
    
    var submit = document.getElementsByClassName('uploaded')[0];
    var results = document.getElementsByClassName('results')[0];
    var duckQuery = document.getElementsByClassName('uploaded__input')[0];
    
    submit.addEventListener('submit', function(e){
    
        e.preventDefault();
        results.innerHTML = '';
    
        var url = duckQuery.value;
        listDucks(url);
    
    })
    
    function call(method, url, callback) {
    var xhr = new XMLHttpRequest;

    xhr.open(method, url);

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            var results = JSON.parse(xhr.responseText);

            callback(results);
        }
    };

    xhr.send();
    };

    function listDucks(query) {
        
        searchDucks(query, function(ducks){
            painDucks(ducks);
            
        });
    };
    
    function searchDucks (query, callback){

        call('GET', query ? 'https://duckling-api.herokuapp.com/api/search?q=' + query : 'https://duckling-api.herokuapp.com/api/search', callback);
    
    };
    
    function searchDetailDuck(id, callback){
    
        call('GET','https://duckling-api.herokuapp.com/api/ducks/' + id, callback);
    };
    
    function painDucks(ducks) {
    
        var results = document.getElementsByClassName('results')[0];
            results.innerHTML = '';
    
            ducks.forEach(function(duck) {
    
                var li = document.createElement('li');
                var div = document.createElement('div');
                var link = document.createElement('a')
                var title = document.createElement('h3');
                var img = document.createElement('img');
                var price = document.createElement('p');
                
    
                link.addEventListener('click', function(e){
    
                    searchDetailDuck(duck.id, detailDuck)});
                    
    
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
    };
    
    function detailDuck(duck) {
    
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
    };