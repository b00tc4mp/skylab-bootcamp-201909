var views = document.getElementsByClassName('view');
var searchView = new View(views[0]);
var detailView = new View(views[1]);
var feedback = new Feedback(document.getElementsByClassName('feedback')[0]);

//

var newAccount = document.getElementsByClassName('btn__new-account')[0]; // cambio de página de login y resgistro 
var btnLogin = document.getElementsByClassName('btn__login')[0]; // cambiar la vista tambén 

newAccount.addEventListener("click", function(){
    document.getElementsByClassName("login")[0].classList.add("hidden")
    document.getElementsByClassName("register")[0].classList.remove("hidden")
})
btnLogin.addEventListener("click", function(){
    document.getElementsByClassName("login")[0].classList.remove("hidden")
    document.getElementsByClassName("register")[0].classList.add("hidden")
})

//


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


// 

var login = new Login(document.getElementsByClassName('login__form')[0]); // TEMA 7, selecciona form container;
login.onSubmit(function (username, password) { // TEMA 7 LE PASAMOS USERNAME PASSWORD A PARTIR DE HTML
    try {
        authenticateUser(username, password, (x,result)=> {
            retrieveUser(result.id, result.token, (result)=>{
                // console.log(result) 
                document.getElementsByClassName('login')[0].classList.add('hidden')
                document.getElementsByClassName('main')[0].classList.remove('hidden')
            })

        });
    } catch (error) {
        feedback.render(error.message);
        document.getElementsByClassName('feedback')[0].classList.remove('hidden')
        document.getElementsByClassName('main')[0].classList.add('hidden')
    }
});


var register = new Register(
    document.getElementsByClassName('register__form')[0]);
register.onSubmit(function (name, surname, email, password) {
    try {
        registerUser(name, surname, email, password, function(){
            document.getElementsByClassName('register')[0].classList.add('hidden')
            document.getElementsByClassName('main')[0].classList.remove('hidden')
        });
    } catch (error) {
        feedback.render(error.message);
        document.getElementsByClassName('feedback')[0].classList.remove('hidden')
        document.getElementsByClassName('main')[0].classList.add('hidden')
    }
});

//

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