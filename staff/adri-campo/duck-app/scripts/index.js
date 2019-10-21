var main = document.getElementsByClassName("main__initial")[0];
var details = document.getElementsByClassName("main__details")[0];
var footer = document.getElementsByClassName("footer")[0];
var form = document.getElementsByClassName("nav__search")[0];

// ESTO ES LA MAIN PAGE ->

var feedback = new Feedback(document.getElementsByClassName('feedback')[1]);

var login = new Login(document.getElementsByClassName('login__loginForm')[0]);
login.onSubmit( function (username, password) { 
    try{ 
        authenticateUser(username, password, (error, result)=> { debugger
            if(error){ 
                feedback.render(error.message); 
                document.getElementsByClassName("feedback")[1].classList.remove('hidden')
                
            } else {
                retrieveUser(result.id, result.token, (result)=>{ 
                document.getElementsByClassName("login")[0].classList.add('hidden')
                document.getElementsByClassName("main__initial")[0].classList.remove('hidden')
                document.getElementsByClassName("nav__search")[0].classList.remove('hidden'); 
                document.getElementsByClassName("footer__button")[0].classList.remove('hidden');  
                         
                alert(`Welcome ${result.data.name}!!`) 
            })
            }
        })

    } catch (error) { 
        feedback.render(error.message);
        document.getElementsByClassName('feedback')[1].classList.remove('hidden')
        document.getElementsByClassName('main__initial')[0].classList.add('hidden')
    }

});

var register = new Register(document.getElementsByClassName('registration__register')[0]);
register.onSubmit(function (name, surname, email, password) { 
    try {
        registerUser(name, surname, email, password, function(){
            document.getElementsByClassName("login")[0].classList.remove('hidden'); 
            document.getElementsByClassName("registration")[0].classList.add('hidden');
        });
    } catch (error) {
        feedback.render(error.message);
        document.getElementsByClassName('feedback')[1].classList.remove('hidden')
        document.getElementsByClassName('main__initial')[0].classList.add('hidden')
    }
});

duckList(); 

var search = new Search(document.getElementsByClassName('nav__search')[0]);
search.onSubmit(duckList);

function duckList (query) {
   searchDucks(query, printDucks);   
};

var results = new Results(document.getElementsByClassName('list')[0]);

function printDucks (ducks) {
    results.render(ducks);
};

function duckPage (id) { 
    var detail = new Detail (document.getElementsByClassName("details")[0]);
    retrieveDuck(id, detail.render); 
};


var btn = document.getElementsByClassName("button")
btn[0].addEventListener('click', function() { duckRefresh() })

function duckRefresh () { 
    document.getElementsByClassName("main__details")[0].classList.add('hidden'); 
    document.getElementsByClassName("main__initial")[0].classList.remove('hidden'); 
    document.getElementsByClassName("nav__search")[0].classList.remove('hidden'); 
    document.getElementsByClassName("login")[0].classList.add('hidden'); 

};


 var registerButton = document.getElementsByClassName("login__registerButton")
    registerButton[0].addEventListener("click", function() {
        document.getElementsByClassName("main__details")[0].classList.add('hidden'); 
        document.getElementsByClassName("main__initial")[0].classList.add('hidden'); 
        document.getElementsByClassName("nav__search")[0].classList.add('hidden'); 
        document.getElementsByClassName("login")[0].classList.add('hidden');
        document.getElementsByClassName("registration")[0].classList.remove('hidden');

    });

 var goBackButton = document.getElementsByClassName("registration__goBackButton")
    goBackButton[0].addEventListener("click", function() {
        document.getElementsByClassName("main__details")[0].classList.add('hidden'); 
        document.getElementsByClassName("main__initial")[0].classList.add('hidden'); 
        document.getElementsByClassName("nav__search")[0].classList.add('hidden'); 
        document.getElementsByClassName("login")[0].classList.remove('hidden');
        document.getElementsByClassName("registration")[0].classList.add('hidden');

    });

 


