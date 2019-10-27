const { Component } = React

const { id, token } = sessionStorage

class App extends Component {
    state = {view : '', error: undefined, user: undefined}
    

    handleRegister = (name, surname, summoner, email, password) => {
        try {
            registerUser(name, surname, summoner, email, password, error => {
                if (error) this.setState({ error: error.message })
                else this.setState({ view: 'landing' })
            })

        } catch (error) {
            this.setState({ error: error.message })
        }
    }

    handleBackToLanding = () => {
        this.setState({ view: 'landing', error: undefined })
    }

    handleLogin = (email, password) => {
        try {             
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
                                this.setState({ view: 'landing', user: name, error: undefined })
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

    handleContact = () => {
        this.setState({ view: 'contact', error: undefined })
    }

    handleonSignOut = () => {
        this.setState({ view: 'landing', error: undefined, user: undefined })
        sessionStorage.clear()
    }



    render() {
        const { state: { view, error, user }, handleHome, handleGoToLogin, handleGoToRegister, handleContact, handleonSignOut, handleRegister, handleBackToLanding, handleLogin } = this

        return <>
            <Header user={user} onHome={handleHome} onLogin={handleGoToLogin} onRegister={handleGoToRegister} onContact={handleContact} onSignOut={handleonSignOut} />
            { view === 'register' && <Register onRegister={handleRegister} onBack={handleBackToLanding}/> }
            { view === 'login' && <Login onLogin={handleLogin} onBack={handleBackToLanding}/> }
        </>
    }
}

