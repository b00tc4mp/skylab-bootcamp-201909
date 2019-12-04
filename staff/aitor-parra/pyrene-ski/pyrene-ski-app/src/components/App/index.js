import React, { useState, useEffect } from 'react';
import './index.sass'
import Landing from '../Landing'
import Register from '../Register'
import Login from '../Login'
import BoardAdmin from '../Board-admin'
import BoardClient from '../Board-client'
import Feedback from '../Feedback'

import { Route, withRouter, Redirect } from 'react-router-dom'
import { authenticateUser, registerUser, retrieveUser } from '../logic'

export default withRouter(function ({ history }) {
    const [name, setName] = useState()
    //const [teams, setTeams] = useState([])

    useEffect(() => {
        const { token } = sessionStorage;

        (async () => {
            if (token) {
                const { name } = await retrieveUser(token)

                setName(name)

            //  COMO REDIRECCIONAR DE BOARDCLIENT O BOARDADMIN EN FUNCION DE SI ROLE "admin" o ROLE "client"

                await retrieveTeams(token)
            }

        })()

    }, [sessionStorage.token])

    function handleGoToRegister() { history.push('/register') }

    function handleGoToLogin() { history.push('/login') }

    async function handleRegister(name, surname, email, username, password) {

        try {
            await registerUser(name, surname, email, username, password )

            history.push('/login')

        } catch (error) {
            console.error(error)
        }
    }

    async function handleLogin(username, password) {
        try {
            const token = await authenticateUser(username, password)

            sessionStorage.token = token

            //  COMO REDIRECCIONAR DE BOARDCLIENT O BOARDADMIN EN FUNCION DE SI ROLE "admin" o ROLE "client"

            history.push('/board')
        } catch (error) {
            console.error(error)
        }
    }

    function handleGoToTeamList() { history.push('/teamlist')}

    function handleGoToLessonList() { history.push('/lessonlist')}



    function handleGoBack() { history.push('/') }

    function handleLogout() {
        sessionStorage.clear()

        handleGoBack()
    }


    const { token } = sessionStorage

    return <>
        <Route exact path="/" render={() => token ? <Redirect to="/landing" /> : <Landing />} />
        <Route path="/register" render={() => token ? <Redirect to="/board-client" /> : <Register onRegister={handleRegister} onBack={handleGoBack} />} />
        <Route path="/login" render={() => token /* I ES CLIENT */ ? <Redirect to="/board-client" /> : <Login onLogin={handleLogin} onBack={handleGoBack} />} />
        <Route path="/board-client" render={() => token /* I ES CLIENT */ ? <BoardClient user={name} lessons={lessons} onBuyLesson={handleBuyLesson} onLogout={handleLogout} /> : <Redirect to="/" />} />
        <Route path="/login" render={() => token /* I ES ADMIN */ ? <Redirect to="/board-admin" /> : <Login onLogin={handleLogin} onBack={handleGoBack} /> } />       
        <Route path="/board-admin" render={() => token /* I ES ADMIN */ ? <BoardAdmin user={name} onTeamList={handleGoToTeamList} onLessonList={handleGoToLessonList} /> : <Redirect to="/" /> } />

    </>
})

/* return <>
<Route exact path="/" render={() => token ? <Redirect to="/board" /> : <Landing onRegister={handleGoToRegister} onLogin={handleGoToLogin} />} />
<Route path="/register" render={() => token ? <Redirect to="/board" /> : <Register onRegister={handleRegister} onBack={handleGoBack} />} />
<Route path="/login" render={() => token ? <Redirect to="/board" /> : <Login onLogin={handleLogin} onBack={handleGoBack} />} />
<Route path="/board" render={() => token ? <Board user={name} tasks={tasks} onLogout={handleLogout} onChangeTaskStatus={handleChangeTaskStatus} onNewTask={handleNewTask} /> : <Redirect to="/" />} />
</> */