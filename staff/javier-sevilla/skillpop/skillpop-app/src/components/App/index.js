import React, { useState, useEffect } from 'react';
import './index.sass'
import Register from '../Register'
import Header from '../Header'
import Login from '../Login'
import Landing from '../Landing'
import { Route, withRouter, Redirect } from 'react-router-dom'
import { authenticateUser, registerUser, retrieveUser, searchAds} from '../../logic'

export default withRouter(function ({ history }) {
    // const [name, setName] = useState()
    // const [tasks, setTasks] = useState([])

    useEffect(() => {
        const { token } = sessionStorage;

        // (async () => {
        //     if (token) {
        //         const { name } = await retrieveUser(token)

        //         setName(name)

        //         await retrieveTasks(token)
        //     }
        // })()
    }, [sessionStorage.token])


    async function handleRegister(name, surname, city, address, email, password) {
        try {
            await registerUser(name, surname, city, address, email, password)

            history.push('/login')
        } catch (error) {
            console.error(error)
        }
    }

    async function handleLogin(email, password) {
        try {
            const token = await authenticateUser(email, password)

            sessionStorage.token = token

            history.push('/')
        } catch (error) {
            console.error(error)
        }
    }

    async function handleSearch(query) {
        try {
            const token = await searchAds(query)

            history.push('/login')
        } catch (error) {
            console.error(error)
        }
    }


    function handleGoBack(webant) { 
        history.push(`/${webant}`) 
        }

    function handleLogout() {
        sessionStorage.clear()
        const webant = "login"
        handleGoBack(webant)
    }

    const { token } = sessionStorage

    return <>
        {/* <Route exact path="/" render={() => <Header onBack={handleGoBack}/>} /> */}
        <Route exact path="/" render={() => <><Landing onSearch={handleSearch} onLogout={handleLogout}/></>}/> 
        <Route path="/register" render={() => <><Header onBack={handleGoBack}/>  <Register onRegister={handleRegister}/></>}/> 
        <Route path="/login" render={() => <><Header onBack={handleGoBack}/> <Login onLogin={handleLogin}/></>}/> 

    </>
})
{/* <Route path="/register" render={() => token ? <Redirect to="/board" /> : <Register onRegister={handleRegister} onBack={handleGoBack} />} />
<Route path="/login" render={() => token ? <Redirect to="/board" /> : <Login onLogin={handleLogin} onBack={handleGoBack} />} />
<Route path="/board" render={() => token ? <Board user={name} tasks={tasks} onLogout={handleLogout} onChangeTaskStatus={handleChangeTaskStatus} onNewTask={handleNewTask} /> : <Redirect to="/" />} />
<Route path="/hello/:name" render={props => <Hello name={props.match.params.name} />} />
<Route path="/hello/:name" render={({ match: { params: { name } } }) => <Hello name={name} />} /> */}