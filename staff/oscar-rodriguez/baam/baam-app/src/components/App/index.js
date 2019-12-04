import React, { useState, useEffect } from "react"
import { Route, withRouter, Redirect } from 'react-router-dom'
import './index.sass'
import Landing from '../Landing'
import Register from '../Register'
import Home from '../Home'
import YourCards from '../YourCards'
import NewCards from '../NewCards'
import SelecHand from '../SelectHand'
import Game from '../Game'
import Feedback from '../Feedback'
import { retrieveUser, registerUser, authenticateUser } from '../../logic'


export default withRouter(function ({ history }) {
    const [user, setUser] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        const { token } = sessionStorage;

        (async () => {
            if (token) {
                const user = await retrieveUser(token)

                setUser(user)
            }
        })()
    }, [sessionStorage.token])

    function handleGoToRegister() { history.push('/register') }

    function handleGoToLanding() { history.push('/') }

    async function handleRegister(name, surname, email, username, password) {
        try {
            await registerUser(name, surname, email, username, password)

            history.push('/')
        } catch({message}){
            setError(message)
        }
    }

    async function handleLogin (nickname, password) {
        try{
            debugger
            const token = await authenticateUser (nickname, password)
    
            sessionStorage.token = token
    
            history.push('/home')
        }
        catch (error) {
            setError(error.message)
        }
    }

    function handleCloseError () {
        setError(undefined)
    }

    const { token } = sessionStorage

    return <>
        <Route exact path="/" render={() => token ? <Redirect to="/home" /> : <Landing onGoToRegister={handleGoToRegister} onLogin={handleLogin} />} />
        <Route path="/register" render={() => token ? <Redirect to="/home" /> : <Register onBack={handleGoToLanding} onRegister={handleRegister}/>} />
        <Route path="/home" render={() => token ? <Home /> : <Redirect to="/home" /> } />
        <Route path="/cards" render={() => token ? <YourCards /> : <Redirect to="/home" /> } />
        <Route path="/newcards" render={() => token ? <NewCards /> : <Redirect to="/home" />} />
        <Route path="/game" render={() => token ? <Game /> : <Redirect to="/home" /> } />
        {error && <Feedback message={error} onClose={handleCloseError}/>}
    </>
})