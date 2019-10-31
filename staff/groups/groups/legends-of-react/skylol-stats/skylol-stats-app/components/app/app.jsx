const { Component } = React

const App = (() => {

    const { id, token } = sessionStorage

    const { pathname, hash } = location

    return class extends Component { 
    state = { view: 'landing', error: undefined, user: undefined, champions: [],  champ: {}}


    componentDidMount() {
        const { id, token } = sessionStorage

        if (id && token) {
            try {
                retrieveUser(id, token, (error, user) => {
                    if (error) return this.setState({ error: error.message })

                    const { summoner } = user

                    this.setState({ user: summoner })
                })
            } catch (error) {
                this.setState({ error: error.message })
            }

            const { hash } = location

            if (hash) {
                const [, link] = hash.split('/champion/')

                this.handleDetail(link)
            } else {
                const { state: { query } } = this

                query && this.handleSearch(query)
            }
        }
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
        location.slash = pathname
        location.hash = `/landing`
        this.setState({ view: 'landing', error: undefined })
    }

    handleGoToLogin = () => {
        location.slash = pathname
        location.hash = `/login`
        this.setState({ view: 'login', error: undefined })
    }

    handleGoToRegister = () => {
        location.slash = pathname
        location.hash = `/register`
        this.setState({ view: 'register', error: undefined })
    }

    handleSummoners = () => {
        location.slash = pathname
        location.hash = `/summoners`
        this.setState({ view: 'summoners', error: undefined, query: undefined })
    }

    handleChampions = query => {
        location.slash = pathname
        location.hash = `/champions`
        try {
            const { id, token } = sessionStorage
            retrieveChampions(id, token, query, (error, result) => {

                if (error) this.setState({ error: error.message })
                else {

                    this.setState({ view: 'champions', error: undefined, champions: result })
                }
            })
        } catch (error) {
            this.setState({error: error.message})
        }
    }


    handleonSignOut = () => {
        this.setState({ view: 'landing', error: undefined, user: undefined })
        sessionStorage.clear()
    }


    handleDetail = link => {debugger
        try {
            const { id, token } = sessionStorage
            retrieveChampion(id, token, link, (error, champ) => {
                if (error) return this.setState({ error: error.message })
                else {
                    this.setState({ view: 'detail', champ : champ })
                    location.slash = pathname
                    location.hash = `/champion/${champ[0].id}`
                }
            })

        } catch (error) {
            this.setState({ error: error.message })
        }
    }

    handleTag = tag => {
        try {
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
    

    handleRetrieveSummoner = (query) => {
        let getSummonerIds
        let getMasteries

        location.hash = ''
        try{
            debugger
            retrieveSummoner(query, (error, summonerIds) => {
                if (error) {
                    return this.setState({ error: error.message })
                }
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
                                        location.slash = pathname
                                        location.hash = `/summoners/${summonerIds.name}`
                                    }  
                            })
                            } catch (error){
                            this.setState({ error: error.message })

                            }
                        })
                    } catch (error) {
                        this.setState({ error: error.message })
                    }
                }
            })
        } catch (error) {
            this.setState({ error: error.message })
        }

    }

    handleFav = champId => {
        const { query } = this.state
        toggleFavChamp(id, token, champId, (error, data) => {
            if (error) return this.setState({ error: error.message })
            const { state: { query } } = this

                retrieveChampions(id, token, query, (error, result) => {
    
                    if (error) this.setState({ error: error.message })
                    else {
     
                        this.setState({ view: 'champions', error: undefined, champions: result})
    
                        
                    }
                })
            
        })

    }

    handleDetailFav = (link, champId) => {
        const { query } = this.state
        toggleFavChamp(id, token, champId, (error, data) => {
            if (error) return this.setState({ error: error.message })
            debugger
            const { state: { query } } = this
                console.log(link)
            retrieveChampion(id, token, link, (error, champ) => {
                if (error) return this.setState({ error: error.message })
                else {
                    this.setState({ view: 'detail', champ : champ })
                }
            })

        })

    }

    render() {

        const { state: { view, error, user, champ, summonerIds, masteries, query, champions, rank }, handleHome, handleGoToLogin, handleGoToRegister, handleonSignOut, handleRegister, handleLogin, handleSummoners, handleChampions, handleDetail, handleRetrieveSummoner, handleTag, handleFav, handleDetailFav } = this


        return <>
            <Header view ={view} user={user} onHome={handleHome} onLogin={handleGoToLogin} onRegister={handleGoToRegister} onSummoners={handleSummoners} onChampions={handleChampions} onSignOut={handleonSignOut} />
            {view === 'landing' && <Landing />}
            {view === 'register' && <Register onRegister={handleRegister} error={error} />}
            {view === 'login' && <Login onLogin={handleLogin} error={error} />}
            {view === 'champions' && user && <Search onSubmit={handleChampions} error={error} />}
            {view === 'champions' && !user && <Nouser />}
            {view === 'champions' && user && <Champions onClick ={handleTag} onFav={handleFav} champions={champions} error={error} GoOnDetail={handleDetail} />}
            {view === 'summoners' && <Search  onSubmit={handleRetrieveSummoner}  error={error} />}
            {view === 'detail' && <Detail onFav={handleDetailFav} champ={champ} error={error} />}
            {view === 'summoners' && !query && <Background/>}
            {view === 'summoners' && query && !error && <Summoner  summonerIds={summonerIds} rank={rank} masteries={masteries} error={error} />}
            <Footer />
            </>
        }
    }
})()


