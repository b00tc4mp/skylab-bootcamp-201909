const { Component } = React

const { id, token } = sessionStorage

class App extends Component {
    state = { view: 'landing', error: undefined, user: undefined, champions: [],  champ: {}}


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
        this.setState({ view: 'summoners', error: undefined, query: undefined })
    }

    handleChampions = query => {
        try {
            retrieveChampions(query, (error, result) => {
                
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
        let getSummonerIds
        let getMasteries
        try{
            debugger
            retrieveSummoner(query, (error, summonerIds)=> {
                if (error) {
                    return this.setState({ error: error.message }) }
                else {
                    getSummonerIds = summonerIds
                    try{
                        retrieveMasteries(summonerIds.id,(error, masteries) =>{
                        if (error) return this.setState({ error: error.message }) 
                        else {
                            getMasteries = masteries                       
                            try{
                                retrieveRank(summonerIds.id,(error, rank) =>{
                                    if (error) return this.setState({ error: error.message })
                                    else { 
                                        this.setState({view:'summoners', error: undefined, masteries: getMasteries, summonerIds: getSummonerIds, query: query, rank:rank})
                                    }  
                            })
                            } catch (error){
                            this.setState({ error: error.message })
                            }
                    }
                })} catch (error){
                        this.setState({ error: error.message })
                }
           }})
        } catch (error){
            this.setState({ error: error.message })
        }
        
    }

    
   

    render() {

        const { state: { view, error, user,  champ, summonerIds, masteries, query, champions, rank }, handleHome, handleGoToLogin, handleGoToRegister, handleonSignOut, handleRegister, handleLogin, handleSummoners, handleChampions, handleDetail, handleRetrieveSummoner, handleTag } = this


        return <>
            <Header user={user} onHome={handleHome} onLogin={handleGoToLogin} onRegister={handleGoToRegister} onSummoners={handleSummoners} onChampions={handleChampions} onSignOut={handleonSignOut} />
            {view === 'landing' && <Landing />}
            {view === 'register' && <Register onRegister={handleRegister} error={error} />}
            {view === 'login' && <Login onLogin={handleLogin} error={error} />}

            {view === 'champions' && <Search onSubmit={handleChampions} error={error} />}
            {view === 'champions' && <Champions onClick ={handleTag} champions={champions} error={error} GoOnDetail={handleDetail} />}
            {view === 'summoners' && <Search  onSubmit={handleRetrieveSummoner}  error={error} />}

            {view === 'detail' && <Detail champ={champ} error={error} />}
            {view === 'summoners' && query && !error && <Summoner  summonerIds={summonerIds} rank={rank} masteries={masteries} error={error} />}
            <Footer />
            </>
        }
    
}

