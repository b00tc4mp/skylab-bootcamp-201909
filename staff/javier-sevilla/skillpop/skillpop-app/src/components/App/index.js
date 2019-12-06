import React, { useState, useEffect } from 'react';
import './index.sass'
import Landing from '../Landing'
import Register from '../Register'
import Login from '../Login'
import { Route, withRouter, Redirect } from 'react-router-dom'
import { authenticateUser, registerUser, retrieveUser} from '../../logic'
import Hello from '../Hello'

export default withRouter(function ({ history }) {
    // const [name, setName] = useState()
    // const [tasks, setTasks] = useState([])

    useEffect(() => {
        const { token } = sessionStorage;

        (async () => {
            if (token) {
                const { name } = await retrieveUser(token)

                setName(name)

                await retrieveTasks(token)
            }
        })()
    }, [sessionStorage.token])

    // function handleGoToRegister() { history.push('/register') }

    // function handleGoToLogin() { history.push('/login') }

    async function handleRegister(name, surname, email, username, password) {
        try {
            await registerUser(name, surname, email, username, password)

            history.push('/login')
        } catch (error) {
            console.error(error)
        }
    }

    async function handleLogin(username, password) {
        try {
            const token = await authenticateUser(username, password)

            sessionStorage.token = token

            history.push('/search')
        } catch (error) {
            console.error(error)
        }
    }

    function handleGoBack() { history.push('/') }

    function handleLogout() {
        sessionStorage.clear()

        handleGoBack()
    }


    // async function handleNewTask(title, description) {
    //     try {
    //         const { token } = sessionStorage

    //         await createTask(token, title, description)

    //         await retrieveTasks(token)
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    const { token } = sessionStorage

    return <>
        <Route exact path="/" render={() => token ? <Redirect to="/search" /> : <Landing onRegister={handleGoToRegister} onLogin={handleGoToLogin} />} />
        <Route path="/register" render={() => token ? <Redirect to="/board" /> : <Register onRegister={handleRegister} onBack={handleGoBack} />} />
        <Route path="/login" render={() => token ? <Redirect to="/board" /> : <Login onLogin={handleLogin} onBack={handleGoBack} />} />
        <Route path="/board" render={() => token ? <Board user={name} tasks={tasks} onLogout={handleLogout} onChangeTaskStatus={handleChangeTaskStatus} onNewTask={handleNewTask} /> : <Redirect to="/" />} />
        {/* <Route path="/hello/:name" render={props => <Hello name={props.match.params.name} />} /> */}
        <Route path="/hello/:name" render={({ match: { params: { name } } }) => <Hello name={name} />} />
    </>
})
