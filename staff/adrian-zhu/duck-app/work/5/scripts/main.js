(function firstDucks() {
    
    searchDucks('', function(ducks){
        ducks = ducks.shuffle().splice(0, 4);
        results.render(ducks)
    })
})();

var search = new Search(document.getElementsByClassName('uploaded')[0]); 
search.onSubmit( function(query){
    searchDucks(query, results.render) // no results.render(ducks)
}); 

var results = new Results(document.getElementsByClassName('results')[0]);
results.onItemRender = function() {
    var item = new ResultItem(document.createElement('li'));
    
    item.onClick = function(id){
        searchDetailDuck(id, function(duck){
            var detail = new Detail(document.getElementsByClassName('details')[0]);

            detail.onBack = function(){
                var views = document.getElementsByClassName('view');

                views[0].classList.remove('hide');
                views[1].classList.add('hide');
            }

            detail.render(duck);
    
            var views = document.getElementsByClassName('view');
    
            views[0].classList.add('hide');
            views[1].classList.remove('hide');
    
        })
    }
    return item;
}