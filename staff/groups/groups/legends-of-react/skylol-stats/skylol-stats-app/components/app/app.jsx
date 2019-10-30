const { Component } = React

const { id, token } = sessionStorage

class App extends Component {
    apikey = 'RGAPI-e37053db-c5d7-4914-b52a-2c9ad00bd9a4'
    state = { view: 'landing', error: undefined, user: undefined, champions: [],  champ: {} }


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
        try {
            retrieveChampions((error, result) => {
                
                if (error) this.setState({ error: error.message })
                else {
                    
                    this.setState({ view: 'champions', error: undefined, champions: result })
                }
            })
        } catch (error) {
            this.setState({ error: error.message })
        }
    }


    handleonSignOut = () => {
        this.setState({ view: 'landing', error: undefined, user: undefined })
        sessionStorage.clear()
    }

    handleDetail = link => {
        try{ 
            retrieveChampion(link, (error, champ)=> {
                if(error) return this.setState({ error: error.message })
                else{
                    this.setState({view: 'detail', champ})
                }
            })

        } catch (error){
            this.setState({ error: error.message })
        }
    }

    handleRetrieveSummoner = (query,apikey) => {
        try{
            retrieveSummoner(query, apikey,(error, summonerIds)=> {
                if(error) return this.setState({ error: error.message })
                else{
                    this.setState({view: 'masteries', summonerId:summonerIds})
                    retrieveMasteries(summonerIds.id,apikey,(error, masteries) =>{
                        if(error) return this.setState({ error: error.message })
                        else{
                            this.setState({view:'masteries',summonerMasteries: masteries})
                        }
                    })
                }
            })
        } catch (error){
            this.setState({ error: error.message })
        }
    }

    render() {
        const { state: { view, error, user, champions, champ, summonerIds, summonerMasteries }, handleHome, handleGoToLogin, handleGoToRegister, handleonSignOut, handleRegister, handleLogin, handleSummoners, handleChampions, handleDetail, handleRetrieveSummoner } = this

        return <>
            <Header user={user} onHome={handleHome} onLogin={handleGoToLogin} onRegister={handleGoToRegister} onSummoners={handleSummoners} onChampions={handleChampions} onSignOut={handleonSignOut} />
            {view === 'landing' && <Landing />}
            {view === 'register' && <Register onRegister={handleRegister} error={error} />}
            {view === 'login' && <Login onLogin={handleLogin} error={error} />}
            {view === 'champions' && <Search error={error} />}
            {view === 'champions' && <Champions champions={champions} error={error} GoOnDetail={handleDetail} />}
            {view === 'summoners' && <Search onSubmit={handleRetrieveSummoner} error={error} />}
            {view === 'detail' && <Detail champ={champ} error={error} />}
            {view === 'masteries' && <Masteries masteries={summonerMasteries} error={error} />}

        </>
    }
    
}

