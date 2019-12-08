import React, { useState, useEffect } from 'react';
import './index.sass'
import Register from '../Register'
import Header from '../Header'
import Login from '../Login'
import Landing from '../Landing'
import Detail from '../Detail'
import Profile from '../Profile'
import { Route, withRouter, Redirect } from 'react-router-dom'
import { authenticateUser, registerUser, retrieveUser, searchAds, retrieveAd, retrievePublicUser, retrieveAds} from '../../logic'

import queryString from 'query-string'

export default withRouter(function ({ history }) {
    const [ads, setAds] = useState([])
    const [adId, setAdId] = useState([])
    const [ad, setAd] = useState([])
    const [user, setUser] = useState([])
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


    function handleGoBack(webant) { 

        
        history.push(`/${webant}`) 
    }

    function handleLogout() {
        sessionStorage.clear()
        const webant = "login"
        handleGoBack(webant)
    }

    function handleGoToRegister() { history.push('/register') }

    function handleGoToLogin() { history.push('/login') }


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
            console.log(token)
            sessionStorage.token = token
            

            history.push('/')
        } catch (error) {
            console.error(error)
        }
    }

    async function handleSearch(query) {
        try {
            const ads = await searchAds(query)

            setAds(ads)

            history.push("/")

        } catch (error) {
            console.error(error)
        }
    }

    async function handleAdDetail(adId) {
        try {
            const ad = await retrieveAd(adId)
            const { name } = await retrievePublicUser(ad.user)

            ad.name = name

            setAdId(adId)
            setAd(ad)

            history.push(`/ad/${adId}`)

        } catch (error) {
            console.error(error)
        }
    }

    async function handleProfile() {
        try {
            const token = sessionStorage.token

            const user = await retrieveUser(token)

            const ads = await retrieveAds(token)

            setAds(ads)
            setUser(user)

            history.push("/profile")

        } catch (error) {
            console.error(error)
        }
    }

    const { token } = sessionStorage

    return <>
        {/* <Route exact path="/" render={() => <Header onBack={handleGoBack}/>} /> */}
        <Route exact path="/" render={() => <><Landing onSearch={handleSearch} onLogin={handleGoToLogin} onRegister={handleGoToRegister} onLogout={handleLogout} ads={ads} adDetail={handleAdDetail} onProfile={handleProfile}/></>}/> 
        <Route path="/register" render={() => <><Header onBack={handleGoBack}/>  <Register onRegister={handleRegister}/></>}/> 
        <Route path="/login" render={() => <><Header onBack={handleGoBack}/> <Login onLogin={handleLogin}/></>}/>  
        <Route path="/ad/:adId" render={() => <><Header onBack={handleGoBack}/><Detail ad={ad} /></>}/> 
        <Route path="/profile" render={() => <><Header onBack={handleGoBack}/><Profile ads={ads} user={user} adDetail={handleAdDetail}/></>}/> 

    </>
})
{/* <Route path="/register" render={() => token ? <Redirect to="/board" /> : <Register onRegister={handleRegister} onBack={handleGoBack} />} />
<Route path="/login" render={() => token ? <Redirect to="/board" /> : <Login onLogin={handleLogin} onBack={handleGoBack} />} />
<Route path="/board" render={() => token ? <Board user={name} tasks={tasks} onLogout={handleLogout} onChangeTaskStatus={handleChangeTaskStatus} onNewTask={handleNewTask} /> : <Redirect to="/" />} />
<Route path="/hello/:name" render={props => <Hello name={props.match.params.name} />} />
<Route path="/hello/:name" render={({ match: { params: { name } } }) => <Hello name={name} />} /> */}