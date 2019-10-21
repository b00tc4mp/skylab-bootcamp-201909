var views = document.getElementsByClassName('view');
var searchView = new View(views[0]);
var detailView = new View(views[1]);
var feedback = new Feedback(document.getElementsByClassName('feedback')[0]);

(function() {
    searchDucks('', function(error, ducks){
        if (error) {
            feedback.render(error.message)

            results.hide();
            feedback.show();
        } else {

            ducks = ducks.shuffle().splice(0, 4);
            results.render(ducks)

        }
    })
})();

var search = new Search(document.getElementsByClassName('uploaded')[0]); 
search.onSubmit( function(query){
    searchDucks(query,function(error, ducks){
        if (error) {
            feedback.render(error.message);

            results.hide();
            feedback.show();
        } else {
            results.render(ducks);

            feedback.hide();
            results.show();
        }
    }) // no results.render(ducks)
}); 

var results = new Results(document.getElementsByClassName('results')[0]);
results.onItemRender = function() {
    var item = new ResultItem(document.createElement('li'));
    
    item.onClick = function(id){
        searchDetailDuck(id, function(error, duck){ debugger;
            if (error) {
                feedback.render(error.message);

                results.hide();
                feedback.show();
            } else {
                
                detail.render(duck);

                searchView.hide();
                detailView.show();
            }
        });
    };

    return item;
}


var detail = new Detail(document.getElementsByClassName('detail')[0]);

detail.onBack = function () {
    
    detailView.hide();
    searchView.show();
};