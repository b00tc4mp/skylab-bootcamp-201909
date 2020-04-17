const { Component } = React

const App = (() => {
    const { id, token } = sessionStorage
    const { pathname, query, hash } = location

    return class extends Component {
        state = { view: id && token ? (hash? 'detail' : 'home') : 'login', error: undefined, query }

        componentDidMount() {
            const { id, token } = sessionStorage

            if (id && token) {
                try {
                    retrieveUser(id, token, (error, user) => {
                        if (error) return this.setState({ error: error.message })

                        const { name } = user

                        this.setState({ user: name })
                    })
                } catch (error) {
                    this.setState({ error: error.message })
                }

                const { hash } = location

                if (hash) {
                    const [, duckId] = hash.split('/duck/')

                    this.handleDetail(duckId)
                } else {
                    const { state: { query } } = this
    
                    query && this.handleSearch(query)
                }
            }
        }

        handleGoToRegister = () => {
            this.setState({ view: 'register' })
        }

        handleGoToLogin = () => {
            this.setState({ view: 'login' })
        }

        handleRegister = (name, surname, email, password) => {
            try {
                registerUser(name, surname, email, password, error => {
                    if (error) return this.setState({ error: error.message })
                       
                    authenticateUser(email, password, (error, data) => {
                        if (error) return this.setState({ error: error.message })
    
                        try {
                            const { id, token } = data
    
                            sessionStorage.id = id
                            sessionStorage.token = token
    
                            retrieveUser(id, token, (error, user) => {
                                if (error) return this.setState({ error: error.message })
    
                                const { name } = user
    
                                this.setState({ view: 'home', user: name, error: undefined})
                            })
                        } catch (error) {
                            this.setState({ error: error.message })
                        }
                    })
                })
            } catch (error) {
                this.setState({ error: error.message })
            }
        }

        handleLogin = (email, password) => {
            try {
                authenticateUser(email, password, (error, data) => {
                    if (error) return this.setState({ error: error.message })

                    try {
                        const { id, token } = data

                        sessionStorage.id = id
                        sessionStorage.token = token

                        retrieveUser(id, token, (error, user) => {
                            if (error) return this.setState({ error: error.message })

                            const { name } = user

                            this.setState({ view: 'home', user: name, error: undefined })
                        })
                    } catch (error) {
                        this.setState({ error: error.message })
                    }
                })
            } catch (error) {
                this.setState({ error: error.message })
            }
        }

        render() {
            const { state: { view, error, user }, handleGoToRegister, handleGoToLogin, handleRegister, handleLogin } = this

            return <div className="container"><>
                {view === 'register' && <Register onRegister={handleRegister} onLogin={handleGoToLogin} error={error} />}
                {view === 'login' && <Login onLogin={handleLogin} onRegister={handleGoToRegister} error={error} />}
                {view === 'home' && <Home user={user} error={error} onLogin={handleGoToLogin} />}
                <Footer/>
            </>
            </div>
        }
    }
})()