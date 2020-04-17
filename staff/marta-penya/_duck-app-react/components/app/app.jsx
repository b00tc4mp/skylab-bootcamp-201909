const { Component } = React

const { id, token } = sessionStorage

const { query } = location

class App extends Component {
    state = { view: 'login', error: undefined, user: undefined, ducks: [], query }

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

    handleonGoLogin = () => {
        this.setState({ view: 'login', error: undefined })
    }

    handleonGoRegister = () => {
        this.setState({ view: 'register', error: undefined })
    }

    handleRegister = (name, surname, email, password) => {
        try {
            registerUser(name, surname, email, password, error => {
                if (error) this.setState({ error: error.message })
                else this.setState({ view: 'login' })
            })

        } catch (error) {
            this.setState({ error: error.message })
        }
    }

    handleLogin = (email, password) => {
        try { debugger
            
            authenticateUser(email, password, (error, data) => {
                if (error)
                    this.setState({ error: error.message })
                else
                    try {
                        
                        const { id, token } = data
                        sessionStorage.id = id
                        sessionStorage.token = token

                        retrieveUser(id, token, (error, user) => {
                            if (error) this.setState({ error: error.message })
                            else {
                                const { name } = user
                                this.setState({ view: 'search', user: name, error: undefined })
                                
                            }
                        })

                    } catch (error) {
                        this.setState({ error: error.message })
                    }

            })

        } catch (error) {
            this.setState({ error: error.message })
        }
    }

    handleSearch = (query) => {
        try {   debugger          
            searchDucks(id, token, query, (error, ducks) => {
                if (error) {
                    this.setState({ error: error.message })

                } else {
                    if (query.length === 0) {
                        ducks = ducks.shuffle().splice(0, 3)
                        this.setState({ error: undefined, ducks })
                        location.query = query
                    }
                    else {
                        this.setState({ error: undefined, ducks })
                        location.query = query
                    }
                }
            })
        } catch (error) {
            this.setState({ error: error.message })
        }
    }



    handleonSignOut = () => {
        this.setState({ view: 'login', user: undefined })
        sessionStorage.clear()

    }

    handleDetail = (id) => {
        try {
            retrieveDuck(id, token, duckId, (error, duck) => {
                if (error) {
                    this.setState({ error: error.message })
                } else {
                    this.setState({ view: 'detail', duck })
                }
            })

        } catch (error) {
            this.setState({ error: error.message })
        }

    }

    handleBackToSearch = () => {
        this.setState({ view: 'search' })
    }


    handleFav = (duckId) => {
        try{
            toggleFavDuck(id, token, duckId, (error) => {
                if(error){
                    this.setState({ error: error.message })
                } else { 
                    searchDucks(id, token, query, (error, ducks) => {
                        if(error){
                            this.setState({ error: error.message })
                        }else{
                            this.setState({ducks})
                        }
                    } )
                }
            })

        } catch(error){
            this.setState({ error: error.message })
        }

    }

    render() {
        const { state: { view, error, user, ducks, duck, query }, handleonGoLogin, handleonGoRegister, handleRegister, handleLogin, handleSearch, handleonSignOut, handleDetail, handleBackToSearch, handleFav } = this

        return <>
            <Header user={user} onSignOut={handleonSignOut} />
            {view === 'register' && <Register onRegister={handleRegister} onGoLogin={handleonGoLogin} error={error} />}
            {view === 'login' && <Login onLogin={handleLogin} onGoRegister={handleonGoRegister} error={error} />}
            {view === 'search' && <Search onSearch={handleSearch} error={error} query={query} />}
            {view === 'search' && <Results onClickItem={handleDetail} duckslist={ducks} onGoFav={handleFav} />}
            {view === 'detail' && < Detail item={duck} onBack={handleBackToSearch}  />}
            <Footer />
        </>
    }

}