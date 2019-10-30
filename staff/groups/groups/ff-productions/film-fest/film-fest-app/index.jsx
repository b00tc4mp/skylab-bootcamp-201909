const { Component } = React
const { id, token } = sessionStorage


class App extends Component {

    constructor() {
        super()
        this.state = { view: 'login', error: undefined, query: undefined, user: undefined, movies: undefined, title: 'Pepito', movie: undefined, title: 'Trendy Movies'}
    }

    componentWillMount() {
        if (id && token) {
            try {
                retrieveUser(id, token, (error, user) => {
                    error ? this.setState({ error: error.message }) : this.setState({ user: user })
                })
            } catch (error) {
                this.setState({ error: error.message })
            }
        }
        retrieveInitialMovies((error, result) => {
            this.setState({ movies: result.results, view: 'landing' })
        })
    }

    handleLogin = (username, password) => {
        try {
            authenticateUser(username, password, (error, data) => {
                if (error) this.setState({ error: error.message })
                else {
                    try {
                        const { id, token } = data

                        sessionStorage.id = id
                        sessionStorage.token = token

                        retrieveUser(id, token, (error, user) => {
                            if (error) this.setState({ error: error.message })
                            else {
                                this.setState({ view: 'landing', user: user })
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



    handleRegister = (name, surname, email, password, passwordConfirmation) => {
        try {
            registerUser(name, surname, email, password, passwordConfirmation, error => {
                error ? this.setState({ error: error.message }) : this.setState({ view: 'landing' })
            })
        } catch (error) {
            this.setState({ error: error.message })
        }
    }

    handleGoLogin = () => {
        this.setState({ view: 'login' })
    }

    handleGoRegister = () => {
        this.setState({ view: 'register' })
    }

    handleGoHome = () => {
        this.setState({ view: 'landing' })
    }

    handleGoGenre = () => {
        this.setState({ view: 'genre' })
    }

    handleGoWatchlist = () => {
        this.setState({ view: 'watchlist' })
    }

    handleGoPersonalArea = () => {

        (sessionStorage.token && sessionStorage.id) ? this.setState({ view: 'personal-area' }) : this.setState({ view: 'login' })

    }

    handleResetHash = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }

    handleGoMovieSpecs = (movieId) => {
        debugger
        try {
            if (sessionStorage.id && sessionStorage.token) {
                retrieveMovie(movieId, sessionStorage.token, sessionStorage.id, (error, movie) => {
                    error ? this.setState({ error }) : this.setState({ view: 'movie-specs', movie })
                })
            } else {
                retrieveMovie(movieId, undefined, undefined, (error, movie) => {
                    error ? this.setState({ error }) : this.setState({ view: 'movie-specs', movie })
                })
            }
        } catch (error) {
            this.setState({ error: error.message })
        }
    }

    handleToggleFavSpecs = (movieId) => {
        debugger
        if(sessionStorage.id && sessionStorage.token){
            try{
                toggleFavMovie(sessionStorage.id, sessionStorage.token, movieId, (result) => {
                    if (result.error) {
                        this.setState({ erro: result.error })
                    } else {
                        debugger
                        retrieveMovie(movieId,  sessionStorage.token, sessionStorage.id, (error, movie) => {
                            (error) ? this.setState({ error: error.message }) : this.setState({ view: 'movie-specs', error: undefined, movie })
                        })
                    }
                })

            } catch(error){
                this.setState({error: error.message})
            }
        } else {
            this.setState({error: 'Premiun function, please log in'})

        }
    }

   


    render() {
        const { state: { view, error, movies, title, movie, user }, handleRegister, handleLogin, handleGoLogin, handleGoRegister, handleGoHome, handleGoGenre, handleGoWatchlist, handleGoPersonalArea,  handleResetHash, handleGoMovieSpecs, handleToggleFavSpecs } = this

        return <>
            <Header onGoHome={handleGoHome} onGoGenre={handleGoGenre} onGoWatchlist={handleGoWatchlist} onGoPersonalArea={handleGoPersonalArea} />

            {view === 'landing' && movies !== undefined && <Movies title={title} movies={movies} items={movies} onMovieRender={item => <MovieItem item={item} key={item.id} onMovieSpecs={handleGoMovieSpecs} />} />}
            {view === 'genre' && <Genre />}
            {view === 'watchlist' && <Watchlist />}
            {view === 'movie-specs' && <MovieSpecs   movie={movie} onToggleFavSpecs={handleToggleFavSpecs} error={error} user={user}/>}
            {view === 'personal-area' && <PersonalArea />}
            {view === 'register' && <Register onRegister={handleRegister} onGoLogin={handleGoLogin} error={error} />}
            {view === 'login' && <Login onLogin={handleLogin} onGoRegister={handleGoRegister} error={error} />}

            <Footer onResetHash={handleResetHash} />

        </>
    }
}


ReactDOM.render(<App />, document.getElementById('root'))

