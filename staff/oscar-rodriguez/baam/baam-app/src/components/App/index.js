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
import { retrieveUser, registerUser, authenticateUser } from '../../logic'


export default withRouter(function ({ history }) {
    const [user, setUser] = useState()
    const [message, setMessage] = useState()
    const [gameId, setGameId] = useState()
    const [games, setGames] = useState()

    useEffect(() => {
        
        const { token } = sessionStorage;

        (async () => {
            if (token) {
                try {
                    debugger
                    const user = await retrieveUser(token)
                    
                    setUser(user)

                } catch (error) {
                    setMessage(error.message)
                }
            }
        })()
    }, [sessionStorage.token])

    function handleGoToRegister() { history.push('/register') }

    function handleGoToLanding() { history.push('/') }

    async function handleRegister(name, surname, email, username, password) {
        try {
            await registerUser(name, surname, email, username, password)

            setMessage("Registered Succesfully. Proceed to Login.")
            history.push('/')
        } catch({message}){
            setMessage(message)
        }
    }

    async function handleLogin (nickname, password) {
        try {
            
            const token = await authenticateUser (nickname, password)
    
            sessionStorage.token = token
    
            history.push('/home')
        }
        catch (error) {
            setMessage(error.message)
        }
    }

    function handleCloseError () { setMessage(undefined) }

    function handleCloseGames () { setGames(undefined) }
    
    function handleLogout () {
        sessionStorage.clear()
        history.push('/')
    }

    function handleGoGetNewCards () { history.push('/newcards') }
    function handleGoShowCards () { history.push('/cards') }
    function handleGoStartGame () { history.push('/game') }
    function handleCreateGame () {}
    
    function handleGoToJoinGame () { setGames([{id:"HFHGHG", nickname:"PAKOO"},
    {id:"HFHGHG", nickname:"PAKOO"},{id:"HFHGHG", nickname:"PAKOO"},{id:"HFHGHG", nickname:"PAKOO"},{id:"HFHGHG", nickname:"PAKOO"}])}
    function handleJoinGame (id) { debugger }

    const { token } = sessionStorage

    return <>
        <Route exact path="/" render={() => token ? <Redirect to="/home" /> : <Landing onGoToRegister={handleGoToRegister} onLogin={handleLogin} />} />
        <Route path="/register" render={() => token ? <Redirect to="/home" /> : <Register onBack={handleGoToLanding} onRegister={handleRegister}/>} />
        <Route path="/home" render={() => token ? <Home user={user} onLogout={handleLogout} onShowCards={handleGoShowCards} onGetNewCards={handleGoGetNewCards} onStartGame={handleGoStartGame}/> : <Redirect to="/" /> } />
        <Route path="/cards" render={() => token ? <YourCards user={user} onLogout={handleLogout} onGetNewCards={handleGoGetNewCards} onHome={handleGoToLanding}/> : <Redirect to="/" /> } />
        <Route path="/newcards" render={() => token ? <NewCards onLogout={handleLogout} onHome={handleGoToLanding}/> : <Redirect to="/" />} />
        <Route exact path="/game" render={() => token ? <Game user={user} onLogout={handleLogout} onCreate={handleCreateGame} onJoin={handleGoToJoinGame} onHome={handleGoToLanding}/> : <Redirect to="/" />} />
        { games && token && <JoinGame games={games} onLogout={handleLogout} onJoin={handleJoinGame} onHome={handleGoToLanding} onClose={handleCloseGames}/> }
        {gameId && <Route path={`/game/${gameId}`} render={() => token ? <GameBoard /> : <Redirect to="/home" /> } />}
        {message && <Feedback message={message} onClose={handleCloseError}/>}
    </>
})