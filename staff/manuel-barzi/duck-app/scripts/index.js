var form = document.getElementById("duck-search"); 
var ul = document.getElementsByClassName("results")[0];
var goHome = document.getElementsByClassName("go-home")[0]; 
var views = document.getElementsByClassName('view');
var newAccount = document.getElementsByClassName('btn__new-account')[0]; // cambio de página de login y resgistro 
var btnLogin = document.getElementsByClassName('btn__login')[0]; // cambiar la vista tambén 
var feedback = new Feedback(document.getElementsByClassName('feedback')[0]);


function getRandomDuck(){
    var xhr = new XMLHttpRequest;
    xhr.open('GET', 'https://duckling-api.herokuapp.com/api/search?q=');
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 201) {
            var ducks = JSON.parse(xhr.responseText);
            var randomDuck = Math.floor(Math.random()*286 )
            var logo = document.getElementsByClassName('logo')[0];
            logo.src = ducks[randomDuck].imageUrl;
        }
    };
    xhr.send(); 
} // random patos


function newElement(item, itemClass, text){
    var newItem = document.createElement(item);
    if(itemClass) newItem.classList.add(itemClass);
    if(text) newItem.innerText = text
    return newItem;
}  // poner clase automaticamente MEGUSTA!


var search = new Search(form); // NO UTILIZADO

var login = new Login(document.getElementsByClassName('login__form')[0]); // TEMA 7, selecciona form container;
login.onSubmit(function (username, password) { // TEMA 7 LE PASAMOS USERNAME PASSWORD A PARTIR DE HTML
    try {
        authenticateUser(username, password, (x,result)=> {
            retrieveUser(result.id, result.token, (result)=>{
                console.log(result)
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

var register = new Register(document.getElementsByClassName('register__form')[0]);
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
var results = new Results(ul);
results.onItemRender = function () {
    var item = new ResultItem(newElement('li','results__item'));
    item.onClick = function (id) {
        retrieveDuck(id, function (duck) {
            var detail = new Detail(document.getElementsByClassName('details')[0]);
            detail.render(duck);
            switchViews();
        });
    };
    return item;
};
search.onSubmit(function (query) {
    searchDucks(query, function (error, ducks) {
        if (error) {
            feedback.render(error.message);
            document.getElementsByClassName('feedback')[0].classList.remove('hidden')
            document.getElementsByClassName('main')[0].classList.add('hidden')
        } else {
            ducks = ducks.splice(0, 9);
            results.render(ducks);
        }
    });
});

// Selfie to print 9 ducks at the beginning
(function () {
    searchDucks('', function (error, ducks) {
        if (error) {
            feedback.render(error.message);
            document.getElementsByClassName('feedback')[0].classList.remove('hidden')
            document.getElementsByClassName('main')[0].classList.add('hidden')
        } else {
            ducks = ducks.splice(0, 9);
            results.render(ducks);
        }
    });
})();

ul.addEventListener("click", function (e) {
    var t = e.target;
    var parent = t.parentElement;
    var d = parent.dataset;
    var detail = new Detail(document.getElementsByClassName('details')[0]);
    retrieveDuck(d.duckId, detail.render);
    switchViews();
})
function switchViews(){
    document.getElementsByClassName('main')[0].classList.toggle('hidden')
    document.getElementsByClassName('details')[0].classList.toggle('hidden')
}
goHome.addEventListener("click", switchViews);
newAccount.addEventListener("click", function(){
    document.getElementsByClassName("login")[0].classList.add("hidden")
    document.getElementsByClassName("register")[0].classList.remove("hidden")
})
btnLogin.addEventListener("click", function(){
    document.getElementsByClassName("login")[0].classList.remove("hidden")
    document.getElementsByClassName("register")[0].classList.add("hidden")
})
getRandomDuck()