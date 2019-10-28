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

    handleLogin = () => {
        this.setState ({login : !(this.state.login)})
    }

    

    render () {
        const { state: {login}, handleBurguer, handleBeers, handleCommunity, handleSubmit, handleInvest, handleLogin } = this

        return <>
            <Header onBurguer={handleBurguer} onBeers={handleBeers} onCommunity={handleCommunity} onSubmit={handleSubmit} onInvest={handleInvest} onLogin={handleLogin}/>
            {login && <Login />}
            <main class="main">
                <Welcome />
                <Speech title="THE BEER EXPERIENCE" text="Join to the best Brewdog's Punk Community. We don't like beer, we are beer."/>
                <Brewdog />
                <Video />
            </main>
            <Footer />
        </>
    }
}