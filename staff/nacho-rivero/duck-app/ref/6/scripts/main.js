debugger
var views = document.getElementsByClassName('view');
var loginView = new View(views[0]);
var searchView = new View(views[1]);
var detailView = new View(views[2]);


(function () {
    searchDucks('', function (error, ducks) {
        if (error) {
            feedback.render(error.message);

            results.hide();
            feedback.show();
        } else {
            ducks = ducks.shuffle().splice(0, 3);

            results.render(ducks);
        }
    });
})();


var login = new Login(document.getElementByClassName('login')[0]);
login.onSubmit(function(username, password){
            checkPass(username, password, function(error){
                if(checkPass(true)){
                    results.render(ducks);

                    feedback.hide();
                    results.show();
                }else{
                    feedback.render(error.message);

                    results.hide();
                    feedback.show();
                }   
});
});

var search = new Search(document.getElementsByClassName('search')[0]);
search.onSubmit(function (query) {
    searchDucks(query, function (error, ducks) {
        if (error) {
            feedback.render(error.message);

            results.hide();
            feedback.show();
        } else {
            results.render(ducks);

            feedback.hide();
            results.show();
        }
    });
});

var results = new Results(document.getElementsByClassName('results')[0]);
results.onItemRender = function () {
    var item = new ResultItem(document.createElement('li'));

    item.onClick = function (id) {
        retrieveDuck(id, function (error, duck) {
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
};

var detail = new Detail(document.getElementsByClassName('detail')[0]);

detail.onBack = function () {
    detailView.hide();
    searchView.show();
};

var feedback = new Feedback(document.getElementsByClassName('feedback')[0]);