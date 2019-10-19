    // preset DOM 
    
    const submit = document.getElementsByClassName('uploaded')[0];
    const results = document.getElementsByClassName('results')[0];
    const duckQuery = document.getElementsByClassName('uploaded__input')[0];
    
  
    // IIFE firstDucks (queryDucks)

    (function firstDucks() {
    
        searchDucks('', function(ducks){
    
            ducks = ducks.shuffle().splice(0, 4);
            painDucks(ducks)
        })
    
    })();
    
    // Presentation
    
    submit.addEventListener('submit', e => {
    
        e.preventDefault();
        results.innerHTML = '';
    
        const url = duckQuery.value;
        listDucks(url);
    
    })

    function painDucks(ducks) {
    
        const results = document.getElementsByClassName('results')[0];
            results.innerHTML = '';
    
            ducks.forEach((duck) => {
    
                const li = document.createElement('li');
                const div = document.createElement('div');
                const link = document.createElement('a')
                const title = document.createElement('h3');
                const img = document.createElement('img');
                const price = document.createElement('p');
                
    
                link.addEventListener('click', e => {
    
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
    
            const detail = document.getElementsByClassName('details')[0];
    
            const title = document.getElementsByClassName('details__title')[0];
            title.innerText = duck.title;
    
            const image = detail.getElementsByClassName('details__image')[0];
            image.src = duck.imageUrl;
    
            const description = detail.getElementsByClassName('details__description')[0];
            description.innerText = duck.description;
    
            const store = detail.getElementsByClassName('details__combination-store')[0];
            store.href = duck.link;
    
            const price = detail.getElementsByClassName('details__combination-price')[0];
            price.innerText = duck.price;
    
            const back = detail.getElementsByClassName('details__combination-back')[0];
            back.addEventListener('click', e => {
                const views = document.getElementsByClassName('view');
    
                views[0].classList.remove('hide');
                views[1].classList.add('hide');
            });
    
            const views = document.getElementsByClassName('view');
    
            views[0].classList.add('hide');
            views[1].classList.remove('hide');
    };


     // helper 
    
     function call(method, url, callback) {
    
        fetch(method, url, response => {
            
            if (response.readyState == 4 && response.status == 201) {
                const results = JSON.parse(response.responseText);

                callback(results);

            }
        });
    }

    // utils 

    function fetch(method, url, callback) {
        const xhr = new XMLHttpRequest;

        xhr.open(method, url);

        xhr.onreadystatechange = function () {
            callback(this);
        };

        xhr.send();
    }

    function listDucks(query) {
        
        searchDucks(query, ducks => {
            painDucks(ducks);
            
        });
    };
    
    // business
    
    function searchDucks (query, callback){

        call('GET', query ? 'https://duckling-api.herokuapp.com/api/search?q=' + query : 'https://duckling-api.herokuapp.com/api/search', callback);
    
    };
    
    function searchDetailDuck(id, callback){
    
        call('GET','https://duckling-api.herokuapp.com/api/ducks/' + id, callback);
    };