const { Component } = React

class App extends Component {
    constructor () { 
        super()
        
        this.state = { view: 'landing', error: undefined }

        this.handleGoToRegister = this.handleGoToRegister.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
        this.handleBackFromRegister = this.handleBackFromRegister.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleBackFromLogin = this.handleBackFromLogin.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleGoToLogin = this.handleGoToLogin.bind(this)
        this.handleResultItem = this.handleDetail.bind(this)


    }

    handleGoToRegister() {
        this.setState({ view: "register"})
    }

    handleGoToLogin() {
        this.setState({ view: "login" })
    }

    handleRegister(name, surname, email, password) {
        try {
            registerUser(name, surname, email, password, error => {
                if (error) this.setState({ error: error.message })
                else this.setState({ view: "landing" })
            })
        } catch (error) {
            this.setState({ error: error.message })
        }
    }

    handleBackFromRegister() {
        this.setState({ view: 'landing', error: undefined })
    }

    handleLogin (email, password) {
        try {
            authenticateUser(email,password, (error, data) => {
                if (error) this.setState({ error: error.message })
                else this.setState({ view: "search" , data })

            })
        } catch (error) {
            this.setState({ error: error.message })
        }
    }

    handleBackFromLogin() {
        this.setState({ view: "landing", error: undefined })
    }

    handleSearch (query) { 
        if(query) {
            try {
                searchDucks(query, (error, ducks) => {
                    if (error) this.setState({ error: error.message })
                    else this.setState({ error: undefined, ducks })
                })
            } catch (error) {   
                this.setState({ error: error.message })
            }

        } else {
            try {
                searchDucks("", (error, ducks) => {
                    if (error) this.setState({ error: error.message })
                    else {
                        ducks = ducks.shuffle().splice(0,4)
                        this.setState({ ducks })
                    }
                })
                
            } catch (error) {
                this.setState({ error: error.message })
            }

        }
    }
    
    handleResultItem (id) {            
        try {
            retrieveDuck(id, (error,duck) => {
                if (error) this.setState({ error: error.message })
                else { this.setState( {view : "view ducks"} ) 
                 this.setState({ duck }) }

            })
            
        } catch (error) { 
            this.setState({ error: error.message })
        
        }
  
    } 

    render() {
        const { state: { view, ducks, error },
                handleGoToRegister, handleGoToLogin, 
                handleRegister, handleBackFromRegister, 
                handleLogin, handleBackFromLogin, 
                handleSearch, handleResultItem } = this

        return <>
            {view === "landing" && <Landing onLogin={handleGoToLogin} onRegister={handleGoToRegister} />}
            {view === "register" && <Register onRegister={handleRegister} onBack={handleBackFromRegister} error={error} />}
            {view === "login" && <Login onLogin={handleLogin} onBack={handleBackFromLogin} error={error} />}
            {view === "search" && <Search onSearch={handleSearch} results={ducks} error={error} />}
            {view === "search" && <Results onResult={duck} />
            /* {view === "search" && <Results onResult={duck} />} */}
                {/* <section className="view ducks">
                <ul className="results" key={Math.random()} >
                    {ducks.map(duck => <Results onResult={duck} /> )}
                </ul>
                </section>} */}

            {view === "view results" && <Results onResult={duck} />}  
            {view === "view result-items" && <ResultItem onResultItem={handleResultItem} />}  
            {view === "view detail" && <Detail />}  

        </>
    }
} 

ReactDOM.render(<App />, document.getElementById('root'))

//{ducks.length > 0 && <Results/>}
//{error && <Feedback error/>}
