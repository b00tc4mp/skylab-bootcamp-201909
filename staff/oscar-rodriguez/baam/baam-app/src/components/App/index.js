import React, { useState, useEffect } from "react"
import { Route, withRouter, Redirect } from 'react-router-dom'
import './index.sass'
import Landing from '../Landing'
import Register from '../Register'
import Home from '../Home'
import YourCards from '../YourCards'
import NewCards from '../NewCards'
import SelecHand from '../SelectHand'
import GameBoard from '../GameBoard'
import Feedback from '../Feedback'
import Game from '../Game'
import JoinGame from '../JoinGame'
import WaitPartner from '../WaitPartner'
import { retrieveUser, registerUser, authenticateUser, createGame } from '../../logic'


export default withRouter(function ({ history }) {
    const [user, setUser] = useState()
    const [feed, setFeed] = useState()
    const [gameId, setGameId] = useState()
    const [games, setGames] = useState()
    const [gameStatus, setGameStatus] = useState()

    useEffect(() => {

        const { token } = sessionStorage;

        (async () => {
            if (token) {
                try {
                    debugger
                    const user = await retrieveUser(token)

                    setUser(user)

                } catch (error) {
                    setFeed({ title: "🦖 There was an error:", message: error.message })
                    sessionStorage.clear()
                }
            }
        })()
    }, [sessionStorage.token])

    function handleGoToRegister() { history.push('/register') }

    function handleGoToLanding() { history.push('/') }

    async function handleRegister(name, surname, email, username, password) {
        try {
            await registerUser(name, surname, email, username, password)

            setFeed({ title: "🕶 Weeell done!!", message: "Registered Succesfully. Proceed to Login." })

            history.push('/')
        } catch ({ message }) {
            setFeed({ title: "🦖 There was an error:", message: message })
        }
    }

    async function handleLogin(nickname, password) {
        try {
            const token = await authenticateUser(nickname, password)

            sessionStorage.token = token

            history.push('/home')
        }
        catch ({ message }) {
            setFeed({ title: "🦖 There was an error:", message: message })
        }
    }

    function handleCloseError() { setFeed(undefined) }

    function handleCloseGames() { setGames(undefined) }

    function handleLogout() {
        sessionStorage.clear()
        history.push('/')
    }

    function handleGoGetNewCards() { history.push('/newcards') }
    function handleGoShowCards() { history.push('/cards') }
    function handleGoStartGame() { history.push('/game') }

    async function handleCreateGame() {
        try {
            debugger
            const { token } = sessionStorage
            const created = await createGame(token)

            sessionStorage.gameId = created.gameId
            sessionStorage.playerId = created.playerId

            setGameStatus('PENDING')
        }
        catch ({ message }) {
            setFeed({ title: "🦖 There was an error:", message: message })
        }
    }

    function handleGoToJoinGame() {

        setGames([{ id: "HFHGHG", nickname: "PAKOO" },
        { id: "HFHGHG", nickname: "PAKOO" },
        { id: "HFHGHG", nickname: "PAKOO" },
        { id: "HFHGHG", nickname: "PAKOO" },
        { id: "HFHGHG", nickname: "PAKOO" }])

    }

    function handleJoinGame(id) { debugger }

    const { token } = sessionStorage

    return <>
        <Route exact path="/" render={() => token ? <Redirect to="/home" /> : <Landing onGoToRegister={handleGoToRegister} onLogin={handleLogin} />} />
        <Route path="/register" render={() => token ? <Redirect to="/home" /> : <Register onBack={handleGoToLanding} onRegister={handleRegister} />} />
        <Route path="/home" render={() => token ? <Home user={user} onLogout={handleLogout} onShowCards={handleGoShowCards} onGetNewCards={handleGoGetNewCards} onStartGame={handleGoStartGame} /> : <Redirect to="/" />} />
        <Route path="/cards" render={() => token ? <YourCards user={user} onLogout={handleLogout} onGetNewCards={handleGoGetNewCards} onHome={handleGoToLanding} /> : <Redirect to="/" />} />
        <Route path="/newcards" render={() => token ? <NewCards onLogout={handleLogout} onHome={handleGoToLanding} /> : <Redirect to="/" />} />
        <Route exact path="/game" render={() => token ? <Game user={user} onLogout={handleLogout} onCreate={handleCreateGame} onJoin={handleGoToJoinGame} onHome={handleGoToLanding} /> : <Redirect to="/" />} />
        {games && token && <JoinGame games={games} onJoin={handleJoinGame} onClose={handleCloseGames} />}
        {gameStatus === 'PENDING' && token && <WaitPartner game={gameId} onClose={handleCloseGames} />}
        {gameId && <Route path={`/game/${gameId}`} render={() => token ? <GameBoard /> : <Redirect to="/home" />} />}
        {feed && <Feedback title={feed.title} message={feed.message} onClose={handleCloseError} />}
    </>
})