const { Component } = React

class App extends Component {
    constructor() {
        super()

        this.state = { view: 'login', error: undefined }

        this.handleLogin = this.handleLogin.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
        this.handleGoToRegister = this.handleGoToRegister.bind(this)
        this.handleGoToLogin = this.handleGoToLogin.bind(this)
    }

    handleLogin(mail, password) {
        try {
            logIn(mail, password, (error, data) => {
                error ? this.setState({ error: error, message }) : this.setState({ view: 'search' })
            })
        } catch (error) {
            this.setState({ error: error.message })
        }
    }

    handleRegister(name, lastName, mail, password, age) {
        try {
            registUser(name, lastName, mail, password, age, (error, data) => {
                error ? this.setState({ error: error.message }) : this.setState({ view: 'search' })
            })
        } catch (error) {
            this.setState({ error: error.message })
        }
    }

    handleGoToLogin() {
        this.setState({ view: 'login' })
    }

    handleGoToRegister() {
        this.setState({ view: 'register' })
    }




    render() {
        const { state: { view, error }, handleGoToRegister, handleGoToLogin, handleRegister, handleLogin } = this

        return <>
            <Header />
            {view.includes('login') && <Login onLogin={handleLogin} onGoRegister={handleGoToRegister} error={error} />}
            {view.includes('register') && <Register onRegister={handleRegister} onGoLogin={handleGoToLogin} error={error} />}
            {view.includes('search') && <Search />}
            <Footer />
        </>
    }
}

ReactDOM.render(<App />, document.getElementById('root'))