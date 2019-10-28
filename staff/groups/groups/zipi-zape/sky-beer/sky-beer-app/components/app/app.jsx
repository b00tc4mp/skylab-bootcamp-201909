const { Component } = React

class App extends Component {
    constructor () {
        super()
        this.state = {login : false}
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
        const { state: {login, name}, handleShowLogin, handleRegister, handleBurguer, handleBeers, handleCommunity, handleSubmit, handleInvest, handleLogin } = this

        return <>
            <Header onBurguer={handleBurguer} onBeers={handleBeers} onCommunity={handleCommunity} onSubmit={handleSubmit} onInvest={handleInvest} onLogin={handleShowLogin} name={name}/>
            {login && <Login onLogin={handleLogin} onRegister={handleRegister} /*error={error}*/ />}
            <main className="main">
                <Welcome />
                <Speech title="THE BEER EXPERIENCE" text="Join to the best Brewdog's Punk Community. We don't like beer, we are beer."/>
                <Brewdog />
                <Video />
            </main>
            <Footer />
        </>
    }
}