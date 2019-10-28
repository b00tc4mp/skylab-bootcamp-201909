const { Component } = React

const { id, token } = sessionStorage

class App extends Component {
    state = {view : 'landing', error: undefined, user: undefined}
    

    handleRegister = (name, surname, summoner, email, password) => {
        try {
            registerUser(name, surname, summoner, email, password, error => {
                if (error) this.setState({ error: error.message })
                else this.setState({ view: 'login' })
            })

        } catch (error) {
            this.setState({ error: error.message })
        }
    }

    handleBackToLanding = () => {
        this.setState({ view: 'landing', error: undefined })
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
                            else { debugger
                                const { summoner } = user
                                this.setState({ view: 'landing', user: summoner, error: undefined })
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

    handleHome = () => {
        this.setState({ view: 'landing', error: undefined })
    }

    handleGoToLogin = () => {
        this.setState({ view: 'login', error: undefined })
    }

    handleGoToRegister = () => {
        this.setState({ view: 'register', error: undefined })
    }

    handleSummoners = () => {
        this.setState({ view: 'summoners', error: undefined })
    }

    handleChampions = () => {
        this.setState({ view: 'champions', error: undefined })
    }


    handleonSignOut = () => {
        this.setState({ view: 'landing', error: undefined, user: undefined })
        sessionStorage.clear()
    }



    render() {
        const { state: { view, error, user }, handleHome, handleGoToLogin, handleGoToRegister, handleonSignOut, handleRegister, handleLogin, handleSummoners, handleChampions } = this

        return <>
            <Header user={user} onHome={handleHome} onLogin={handleGoToLogin} onRegister={handleGoToRegister} onSummoners={handleSummoners} onChampions={handleChampions} onSignOut={handleonSignOut} />
            { view === 'landing' && <Landing />} 
            { view === 'register' && <Register onRegister={handleRegister} error={error}/> }
            { view === 'login' && <Login onLogin={handleLogin} error={error}/> }
            { view === 'champions' && <Search error={error}/> }
            { view === 'champions' && <Champions error={error}/> }
            { view === 'summoners' && <Search error={error}/> }

        </>
    }
}

