const { Component } = React

const { id, token } = sessionStorage

class App extends Component {
    state = { view: 'landing', error: undefined, user: undefined, champions: [],  champ: {}}

    componentWillMount() {
        if (id && token)
            try {
                retrieveUser(id, token, (error, user) => {
                    if (error) this.setState({ error: error.message })
                    else {
                        const { name } = user

                        this.setState({ user: name })
                    }
                })
            } catch (error) {
                this.setState({ error: error.message })
            }

        const { state: { query } } = this

        query && this.handleSearch(query)
    }

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

    handleChampions = query => {
        try {
            const {id, token} = sessionStorage
            retrieveChampions(id, token, query, (error, result) => {
                
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

    handleTag = tag => {
        try{
            retrieveTag(tag, (error, result) => {
                if (error) this.setState({ error: error.message })
                else {
                    
                    this.setState({ view: 'champions', error: undefined, champions: result })
                }
            })
        }
        catch (error) {
            this.setState({ error: error.message })
        }
    }

    handleRetrieveSummoner = query => {
        try{
            retrieveSummoner(query, (error, summonerIds)=> {
                if(error) return this.setState({ error: error.message })
                else{
                    this.setState( {summonerIds:summonerIds, query: query})
                    try{
                        debugger
                        retrieveMasteries(summonerIds.id,(error, masteries) =>{
                            if(error) return this.setState({ error: error.message })
                            else{
                                this.setState({view:'summoners', masteries: masteries})
                            }

                        })}
                        catch (error){
                            this.setState({ error: error.message })

                    }
            }})
        
        } catch (error){
            this.setState({ error: error.message })
        }
    }
   

    render() {
        const { state: { view, error, user,  champ, summonerIds, masteries, query, champions }, handleHome, handleGoToLogin, handleGoToRegister, handleonSignOut, handleRegister, handleLogin, handleSummoners, handleChampions, handleDetail, handleRetrieveSummoner, handleTag, handleMasteries } = this

        return <>
            <Header user={user} onHome={handleHome} onLogin={handleGoToLogin} onRegister={handleGoToRegister} onSummoners={handleSummoners} onChampions={handleChampions} onSignOut={handleonSignOut} />
            {view === 'landing' && <Landing />}
            {view === 'register' && <Register onRegister={handleRegister} error={error} />}
            {view === 'login' && <Login onLogin={handleLogin} error={error} />}
            {view === 'champions' && <Search onSubmit={handleChampions} error={error} />}
            {view === 'champions' && <Champions onClick ={handleTag} champions={champions} error={error} GoOnDetail={handleDetail} />}
            {view === 'summoners' && <Search  onSubmit={handleRetrieveSummoner} handl error={error} />}
            {view === 'detail' && <Detail champ={champ} error={error} />}
            {view === 'summoners' && query && <Summoner  summonerIds={summonerIds} masteries={masteries} error={error} />}

            </>
        }
    
}

