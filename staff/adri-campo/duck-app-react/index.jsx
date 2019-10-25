const { Component } = React

const { id, token } = sessionStorage

const { query } = location

class App extends Component {
    constructor () { 
        super()
        
        this.state = { view: id && token ? "search" : "landing", error: undefined, query }

        this.handleGoToRegister = this.handleGoToRegister.bind(this)
        this.handleGoToLogin = this.handleGoToLogin.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
        this.handleBackToLanding = this.handleBackToLanding.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleDetail = this.handleDetail.bind(this)
        this.handleBackToSearch = this.handleBackToSearch.bind(this)
        this.handleFav = this.handleFav.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        
    }

    componentWillMount() {
        const { id, token } = sessionStorage

        if (id && token)
            try {
                retrieveUser(id, token, (error, { name }) => {
                    if (error) this.setState({ error: error.message })
                    else this.setState({ user: name })
                })
            } catch (error) {
                this.setState({ error: error.message })
            }

        const { state: { query } } = this

        query && this.handleSearch(query)
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

    handleBackToLanding() {
        this.setState({ view: 'landing', error: undefined })
    }

    handleLogin (email, password) {
        try {
            authenticateUser(email,password, (error, { id, token }) => {
                if (error) this.setState({ error: error.message })
                else
                    try{
                        sessionStorage.id = id
                        sessionStorage.token = token
                
                        retrieveUser(id, token, (error, { name } ) => {
                            if (error) this.setState({ error: error.message })
                            else this.setState({ view: "search" , user: name })
                           
                    })

                    } catch (error) {
                        this.setState({ error: error.message })
                    }    
            })
        } catch (error) {
            this.setState({ error: error.message })
        }
    }

    handleLogout () {
        this.setState({ view: "landing", error: undefined })
    }

    handleSearch (query) { 
        if(query) {
            try {
                searchDucks(query, (error, ducks) => {
                    if (error) this.setState({ error: error.message })
                    else {
                        location.query = query 
                        
                        this.setState({ error: undefined, ducks })
                    }
                })
            } catch (error) {   
                this.setState({ error: error.message })
            }

        } else {
            try {
                searchDucks("", (error, ducks) => {
                    if (error) this.setState({ error: error.message })
                    else {
                        ducks = ducks.shuffle().splice(0,15)
                        this.setState({ ducks })
                    }
                })
                
            } catch (error) {
                this.setState({ error: error.message })
            }

        }
    }
    
    handleDetail (id) {            
        try {
            retrieveDuck(id, (error,duck) => {
                if (error) this.setState({ error: error.message })
                else { this.setState( {view : "detail" , duck } ) 
                 this.setState({ duck }) }

            })
            
        } catch (error) { 
            this.setState({ error: error.message })
        
        }
  
    } 

    handleBackToSearch () {
        this.setState ({ view : "search" }) 
    }


    handleFav (duckId) {
        const { ducksList } = this.state
        
        const duckIndex = ducksList.findIndex(duck=>{
            return duck.id === duckId
        })
        ducksList[duckIndex].fav = !ducksList[duckIndex].fav
        this.setState({ ducksList})

        const {id,token} = this.state
        retrieveUser (id, token, (error, {data}) => {
            if(error) this.setState({error: error.message})
            else {
                toogleFavDucks(id,token,duckId,(error, results) => {
                    if (error) this.setState({error: error.message})
                })
            }
        })
    }
  

    render() {
        const { state:  { view, error, ducks, duck, user, query }, 
                handleGoToRegister, handleGoToLogin, handleRegister, 
                handleBackToLanding, handleLogin, handleSearch,  
                handleDetail, handleBackToSearch, handleFav, handleLogout } = this

        return <>
            {view === "landing" && <Landing onLogin={handleGoToLogin} onRegister={handleGoToRegister} />}
            {view === "register" && <Register onRegister={handleRegister} onBack={handleBackToLanding} error={error} />}
            {view === "login" && <Login onLogin={handleLogin} onBack={handleBackToLanding} error={error} />}
            {view === "search" && <>
                <Search onClick ={handleLogout} onSubmit={handleSearch} results={ducks} error={error} onResultsRender={results => <Results items={results} onItemRender={item => <ResultItem item={item} key={item.id} onClick={handleDetail} onFav={handleFav} isFav={isFav} />} />} user={user} query={query} />
                {error && <Feedback message={error} />}
            </>}

            {view === "detail" && <Detail item={duck} onBack={handleBackToSearch} onClick ={handleLogout}  />}  
        </>
    }
} 

ReactDOM.render(<App />, document.getElementById('root'))

//{ducks.length > 0 && <Results/>}
//{error && <Feedback error/>}



{/* {view === "favorites" && <Favorites item={duck} onBack={handleBackToSearch} onClick ={handleLogout} error={error} />}   */}
