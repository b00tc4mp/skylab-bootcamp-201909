const main = document.getElementsByClassName("main__initial")[0]
const details = document.getElementsByClassName("main__details")[0]
const footer = document.getElementsByClassName("footer")[0]
const form = document.getElementsByClassName("nav__search")[0]

// LOGIN + REGISTER USER PAGES

const feedback = new Feedback(document.getElementsByClassName('feedback')[1])

const login = new Login(document.getElementsByClassName('login__loginForm')[0])
login.onSubmit( (username, password) => { 
    try { 
        authenticateUser(username, password, (error, result) => { 
            if(error){ 
                feedback.render(error.message)
                document.getElementsByClassName("feedback")[1].classList.remove('hidden')
                
            } else {
                retrieveUser(result.id, result.token, (result) => { 
                document.getElementsByClassName("login")[0].classList.add('hidden')
                document.getElementsByClassName("main__initial")[0].classList.remove('hidden')
                document.getElementsByClassName("nav__search")[0].classList.remove('hidden') 
                document.getElementsByClassName("footer__button")[0].classList.remove('hidden')  
                document.getElementsByClassName("feedback")[1].classList.add('hidden')
                         
                alert(`Welcome ${result.data.name}!!`) 
                
                })
            }    
        })

    } catch (error) { 
        feedback.render(error.message)
        document.getElementsByClassName('feedback')[1].classList.remove('hidden')
        document.getElementsByClassName('main__initial')[0].classList.add('hidden')
    }

})

const register = new Register(document.getElementsByClassName('registration__register')[0])
register.onSubmit( (name, surname, email, password) => { 
    try {
        registerUser(name, surname, email, password, () => {
            document.getElementsByClassName("login")[0].classList.remove('hidden') 
            document.getElementsByClassName("registration")[0].classList.add('hidden')
        })
    } catch (error) {
        feedback.render(error.message)
        document.getElementsByClassName('feedback')[1].classList.remove('hidden')
        document.getElementsByClassName('main__initial')[0].classList.add('hidden')
    }
})

// BUTTONS FROM THE LOGIN & REGISTER PAGES TO MOVE TO THE OTHER VIEW

const registerButton = document.getElementsByClassName("login__registerButton")
    registerButton[0].addEventListener("click", () => {
        document.getElementsByClassName("main__details")[0].classList.add('hidden') 
        document.getElementsByClassName("main__initial")[0].classList.add('hidden') 
        document.getElementsByClassName("nav__search")[0].classList.add('hidden') 
        document.getElementsByClassName("login")[0].classList.add('hidden')
        document.getElementsByClassName("registration")[0].classList.remove('hidden')

    })

const goBackButton = document.getElementsByClassName("registration__goBackButton")
    goBackButton[0].addEventListener("click", () => {
        document.getElementsByClassName("main__details")[0].classList.add('hidden') 
        document.getElementsByClassName("main__initial")[0].classList.add('hidden') 
        document.getElementsByClassName("nav__search")[0].classList.add('hidden') 
        document.getElementsByClassName("login")[0].classList.remove('hidden')
        document.getElementsByClassName("registration")[0].classList.add('hidden')

    })

// ENTRY TO THE MAIN PAGE AND PRINT ALL DUCKS

duckList() 

const search = new Search(document.getElementsByClassName('nav__search')[0])
search.onSubmit(duckList)

function duckList (query) {
   searchDucks(query, printDucks)   
}

const results = new Results(document.getElementsByClassName('list')[0])

function printDucks (ducks) {
    results.render(ducks)
}

// PRINT SINGLE DUCK

function duckPage (id) { 
    const detail = new Detail (document.getElementsByClassName("details")[0])
    retrieveDuck(id, detail.render) 
}

// RETURN HOME PAGE BUTTON AND VIEW THE MAIN PAGE AGAIN

const btn = document.getElementsByClassName("button")
btn[0].addEventListener('click', () => { duckRefresh() })

function duckRefresh () { 
    document.getElementsByClassName("main__details")[0].classList.add('hidden') 
    document.getElementsByClassName("main__initial")[0].classList.remove('hidden') 
    document.getElementsByClassName("login")[0].classList.add('hidden') 
}
 


