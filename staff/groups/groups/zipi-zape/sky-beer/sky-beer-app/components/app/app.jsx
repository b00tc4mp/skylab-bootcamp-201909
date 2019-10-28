const { Component } = React

class App extends Component {
    constructor () {
        super()

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

    }

    

    render () {
        const {handleBurguer, handleBeers, handleCommunity, handleSubmit, handleInvest, handleLogin } = this

        return <>
            <Header onBurguer={handleBurguer} onBeers={handleBeers} onCommunity={handleCommunity} onSubmit={handleSubmit} onInvest={handleInvest} onLogin={handleLogin}/>
        </>
    }
}