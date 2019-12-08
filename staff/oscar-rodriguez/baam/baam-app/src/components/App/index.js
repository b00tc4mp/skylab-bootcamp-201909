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
import Context from '../Context'
import { retrieveUser, registerUser, authenticateUser, createGame, deleteGame, joinGame, retrieveGame, addPlayerHand, retrieveUserCards } from '../../logic'


export default withRouter(function ({ history }) {
    const [user, setUser] = useState()
    const [feed, setFeed] = useState()
    const [join, setJoin] = useState(false)
    const [wait, setWait] = useState(false)

    useEffect(() => {

        const { token } = sessionStorage;

        (async () => {
            if (token) {
                try {
                    const user = await retrieveUser(token)
                    setUser(user)
                } catch ({ message }) {
                    setFeed({ title: "🦖 There was an error:", message })
                }
            }
        })()
    }, [sessionStorage.token])

    useEffect(() => {

        const { gameId } = sessionStorage;

        (async () => {
            if (gameId) {
                try {
                    const game = await retrieveGame(gameId, token)
                    game.status === "READY" && history.push(`/board-game/${gameId}`)
                } catch ({ message }) {
                    setFeed({ title: "🦖 There was an error:", message })
                }
            }
        })()
    }, [sessionStorage.gameId])
    
    ////***********  NAVIGATION HANDLERS 
    function handleGoToLanding() { history.push('/') }
    function handleGoToRegister() { history.push('/register') }
    function handleGoGetNewCards() { history.push('/newcards') }
    function handleGoShowCards() { history.push('/cards') }
    function handleGoStartGame() { history.push('/newgame') }
    function handleGoToJoinGame() { setJoin(true) }


    function handleCloseError() { setFeed(undefined) }
    function handleCloseJoinWindow() { setJoin(!join) }

    async function handleRegister(name, surname, email, username, password) {
        try {
            await registerUser(name, surname, email, username, password)

            setFeed({ title: "🕶 Weeell done!!", message: "Registered Succesfully. Proceed to Login." })

            history.push('/')
        } catch ({ message }) {
            setFeed({ title: "🦖 There was an error:", message })
        }
    }

    async function handleLogin(nickname, password) {
        try {
            const token = await authenticateUser(nickname, password)
            sessionStorage.token = token

            history.push('/home')
        }
        catch ({ message }) {
            setFeed({ title: "🦖 There was an error:", message })
        }
    }

    function handleLogout() {
        sessionStorage.clear()
        history.push('/')
    }

    async function handleGoToCreateGame() {
        try {
            const { token } = sessionStorage
            const { gameId, playerId } = await createGame(token)
            const userCards = await retrieveUserCards(token)
            debugger
            const playerHand = []
            userCards.forEach(card=>playerHand.push(card.id))
            await addPlayerHand(gameId, token, playerHand)
            sessionStorage.gameId = gameId

            setWait(!wait)
        }
        catch ({ message }) {
            setFeed({ title: "🦖 There was an error:", message })
        }
    }

    async function handleCloseWaiting(gameId) {
        try {
            const { token } = sessionStorage
            const game = await retrieveGame(gameId, token)
            if (game.status === 'PENDING')
                await deleteGame(gameId, token)

            delete sessionStorage.gameId

            setWait(!wait)

        } catch ({ message }) {
            setFeed({ title: "🦖 There was an error:", message })
        }
    }
    
    function handleChangeStatus(newStatus, gameId) {
        setWait(!wait)
        debugger
        history.push(`/board-game/${gameId}`)
    }

    async function handleJoinGame(gameId) {
        try {
            debugger
            const { token } = sessionStorage
            await joinGame(token, gameId)
            const userCards = await retrieveUserCards(token)
            const playerHand = []
            userCards.forEach(card=>playerHand.push(card.id))
            await addPlayerHand(gameId, token, playerHand)
            sessionStorage.gameId = gameId

            setJoin(!join)
            history.push(`/board-game/${gameId}`)
        } catch ({ message }) {
            setFeed({ title: "🦖 There was an error:", message })
        }
    }

    const { token, gameId } = sessionStorage

    return <>
        <Context.Provider value={{feed,setFeed}}>
            <Route exact path="/" render={() => token ? <Redirect to="/home" /> : <Landing onGoToRegister={handleGoToRegister} onLogin={handleLogin} />} />
            <Route path="/register" render={() => token ? <Redirect to="/home" /> : <Register onBack={handleGoToLanding} onRegister={handleRegister} />} />
            <Route path="/home" render={() => token ? 
                                                    gameId ? <Redirect to={`/board-game/${gameId}`} /> 
                                                    : 
                                                    <Home user={user} onLogout={handleLogout} onShowCards={handleGoShowCards} onGetNewCards={handleGoGetNewCards} onStartGame={handleGoStartGame} /> 
                                                :
                                                <Redirect to="/" />} />
            <Route path="/cards" render={() => token ? <YourCards user={user} onLogout={handleLogout} onGetNewCards={handleGoGetNewCards} onHome={handleGoToLanding} /> : <Redirect to="/" />} />
            <Route path="/newcards" render={() => token ? <NewCards onLogout={handleLogout} onHome={handleGoToLanding} /> : <Redirect to="/" />} />
            <Route path="/newgame" render={() => token ? <Game user={user} onLogout={handleLogout} onCreate={handleGoToCreateGame} onJoin={handleGoToJoinGame} onHome={handleGoToLanding} /> : <Redirect to="/" />} />
            {join && token && <JoinGame onJoin={handleJoinGame} onClose={handleCloseJoinWindow} />}
            {wait && token && <WaitPartner onChangeStatus={handleChangeStatus} gameId={gameId} onClose={handleCloseWaiting} history={history} />}
            <Route path="/board-game/:gameId" render={() => token ? <GameBoard history={history}/> : <Redirect to="/home" />} />}
            {feed && <Feedback title={feed.title} message={feed.message} onClose={handleCloseError} />}
        </Context.Provider>
    </>
})