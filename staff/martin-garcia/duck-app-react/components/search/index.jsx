const { Component } = React

class App extends Component {
    constructor() {
        super()

        this.state = { view: 'search', error: undefined , ducks: undefined}

        

    }

    handleLogin = (mail, password) => {
        try {
            logIn(mail, password, (error, data) => {
                error ? this.setState({ error: error.message }) : this.setState({ view: 'search' })
            })
        } catch (error) {
            this.setState({ error: error.message })
        }
    }

    handleRegister = (name, lastName, mail, password, age) => {
        try {
            registUser(name, lastName, mail, password, age, (error, data) => {
                error ? this.setState({ error: error.message }) : this.setState({ view: 'search' })
            })
        } catch (error) {
            this.setState({ error: error.message })
        }
    }

    handleGoToLogin = () => {
        this.setState({ view: 'login' })
    }

    handleGoToRegister = () => {
        this.setState({ view: 'register' })
    }

    handleSearch = (query) => {
        try{
            searchDucks(query, (error, ducks)=>{
                if(error){
                    this.setState({error: error.message})
                } else {
                    this.setState({ducks})
                    debugger
                }
            })
        } catch(error){

        }
    }



    render() {
        const { state: { view, error }, handleGoToRegister, handleGoToLogin, handleRegister, handleLogin, handleSearch } = this

        return <>
            <Header />
            {view.includes('login') && <Login onLogin={handleLogin} onGoRegister={handleGoToRegister} error={error} />}
            {view.includes('register') && <Register onRegister={handleRegister} onGoLogin={handleGoToLogin} error={error} />}
            {view.includes('search') && <Search onSearch={handleSearch} onResultsRender={results =><Results items={results} onItemRender={item =><ResultItem  item={item} key={item.id} onClick={handleDetail}/>} />}  />}
            <Footer />
        </>
    }
}

ReactDOM.render(<App />, document.getElementById('root'))