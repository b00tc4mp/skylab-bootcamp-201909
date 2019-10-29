const { Component } = React

class App extends Component {
    constructor () {
        super()
        this.state = {login : false, randomBeers : []}
    }

    componentWillMount () {
        const credentials = JSON.parse(sessionStorage.getItem('credentials'))
        if (credentials) {
            const { id , token } = credentials
            this.setState ({id : id , token : token})
            try {
                retrieveUser(id, token, (error, user) => {
                    if (error) this.setState({ error: error.message })
                    else {
                        const { name } = user
                        this.setState({ name: name })
                    }
                })
            } catch (error) {
                this.setState({ error: error.message })
            }
        }
        
        let random = []
        for (let i=0; i<4; i++) {
            try {
                retrieveRandomBeer((error, beer) => {
                    if(error) this.setState({error : error.message})
                    else random.push(beer)
                    this.setState({randomBeers : random})
                })
            } catch (error) {
                this.setState( {error: error.message})
            }
        }
    }

    handleBurguer = () => {
    
    }

    handleBeers = () => {

    }

    handleCommunity = () => {

    }

    handleSubmit = () => {

    }

    handleInvest = () => {

    }

    handleShowLogin = () => {
        this.setState ({login : !(this.state.login)})
    }

    handleLogin = (username, password) => {
        try {
            authenticateUser (username, password, (error, credentials)=>{
                if (error) this.setState ({error : error.message})
                else {
                    sessionStorage.setItem ('credentials', JSON.stringify(credentials))
                    this.setState ({id : credentials.id , token : credentials.token})
                    try{
                        retrieveUser (credentials.id, credentials.token, (error, user) => {
                            if (error) this.setState ({error : error.message})
                            else this.setState ({name : user.name, login : false})
                        })
                    } catch (error) {
                        this.setState ({ error : error.message})
                    }
                }
            })  
        } catch (error) {
            this.setState ({ error : error.message })
        }
    }

    handleRegister = (name, surname, email, password) => {
        try{
            registerUser(name, surname, email, password, error => {
                if (error) this.setState ({ error:  error.message })    
                else this.setState ({ login : false })
            }) 
            
        } catch (error) {
            this.setState ({ error: error.message })
        }

    }

    render () {
        const { state: {login, name, randomBeers}, handleShowLogin, handleRegister, handleBurguer, handleBeers, handleCommunity, handleSubmit, handleInvest, handleLogin } = this

        return <>
            <Header onBurguer={handleBurguer} onBeers={handleBeers} onCommunity={handleCommunity} onSubmit={handleSubmit} onInvest={handleInvest} onLogin={handleShowLogin} name={name}/>
            {login && <Login onLogin={handleLogin} onRegister={handleRegister} /*error={error}*/ />}
            <main className="main">
                {(randomBeers.length === 4) && <Welcome randomBeers={randomBeers}/>}
                <Speech title="THE BEER EXPERIENCE" text="Join to the best Brewdog's Punk Community. We don't like beer, we are beer."/>
                <Brewdog />
                <Video />
            </main>
            <Footer />
        </>
    }
}