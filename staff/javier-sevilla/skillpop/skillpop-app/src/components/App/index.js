import React, { useState, useEffect } from 'react';
import './index.sass'
import Register from '../Register'
import Header from '../Header'
import Login from '../Login'
import Landing from '../Landing'
import Detail from '../Detail'
import Profile from '../Profile'
import ModifyAd from '../ModifyAd'
import CreateAd from '../CreateAd'
import { Route, withRouter, Redirect } from 'react-router-dom'
import { authenticateUser, registerUser, retrieveUser, searchAds, retrieveAd, retrievePublicUser, retrieveAds, removeAd, modifyAd, saveImageAd, modifyUser, saveImageProfile, 
         createAd} from '../../logic'

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

    async function handleDeleteAd(adId) {
        try {
            const token = sessionStorage.token

            await removeAd(token, adId)

            const ads = await retrieveAds(token)

            setAds(ads)            

            history.push("/profile")

        } catch (error) {
            console.error(error)
        }
    }

    async function handleToUpdateAd(adId) {

         try {

            const token = sessionStorage.token 

            const ad = await retrieveAd(adId)

            setAd(ad)   
            setAdId(adId)       

            // history.push("/update")    

            history.push(`/update/${adId}`)

        } catch (error) {
            console.error(error)
        }      
    }

    async function handleOnUpdateAd(image, adId, title, description, price) {

         try {

            const token = sessionStorage.token 

            const priceN = Number.parseInt(price)

            await modifyAd(token, adId, title, description, priceN)

            if (image) {
				await saveImageAd(token, adId, image)
			}

            const ad = await retrieveAd(adId)

            setAd(ad)   
            setAdId(adId)     

            history.push("/profile")    

            // history.push(`/update/${adId}`)

        } catch (error) {
            console.error(error)
        }      
    }

    async function handleUpdateUser(image, name, surname, city, address ) {

         try {

            const token = sessionStorage.token 

            await modifyUser(token, name, surname, city, address)

            if (image) {
				await saveImageProfile(token, image)
			}

            const user = await retrieveUser(token)

            setUser(user)            

           history.push("/profile")

        } catch (error) {
            console.error(error)
        }      
    }

    async function handleToCreateAd( ) {   

           history.push("/newad")
  
    }

    async function handleCreateAd(image, title, price, description) {   

         try {

            const token = sessionStorage.token 

            const priceN = Number.parseInt(price)

            const adId = await createAd(token, title, description, priceN)

            if (image) {
				await saveImageAd(token, adId, image)
			}

            const user = await retrieveUser(token)
            const ad = await retrieveAd(adId)

            setAd(ad)  
            setUser(user)            

           history.push(`/ad/${adId}`)

        } catch (error) {
            console.error(error)
        }  
    }


    // ESTOY AQUI

    async function handleToPubliProfile(id) {   

        if (!id) {
            const token = sessionStorage.token 
            const user = await retrieveUser(token)
            id = user.id
            const ads = await retrieveAds(token)
        } else {


        }

        

        setAds(ads)   
        setUser(user)
        
        history.push("/profile/:id")
  
    }




    const { token } = sessionStorage

    return <>
        {/* <Route exact path="/" render={() => <Header onBack={handleGoBack}/>} /> */}
        <Route exact path="/" render={() => <><Landing onSearch={handleSearch} onLogin={handleGoToLogin} onRegister={handleGoToRegister} onLogout={handleLogout} ads={ads} adDetail={handleAdDetail} onProfile={handleProfile}
                                                       onToCreateAd={handleToCreateAd}/></>}/> 
        <Route path="/register" render={() => <><Header onBack={handleGoBack}/>  <Register onRegister={handleRegister}/></>}/> 
        <Route path="/login" render={() => <><Header onBack={handleGoBack}/> <Login onLogin={handleLogin}/></>}/>  
        <Route path="/ad/:adId" render={() => <><Header onBack={handleGoBack}/><Detail ad={ad} /></>}/> 
        <Route path="/profile" render={() => <><Header onBack={handleGoBack}/><Profile ads={ads} user={user} adDetail={handleAdDetail} onDeleteAd={handleDeleteAd} onToUpdateAd={handleToUpdateAd} onUpdateUser={handleUpdateUser}/></>}/> 
        <Route path="/update/:adId" render={() => <><Header onBack={handleGoBack}/><ModifyAd ad={ad} onUpdateAd={handleOnUpdateAd}/></>}/>
        <Route path="/newad" render={() => <><Header onBack={handleGoBack}/><CreateAd onCreateAd={handleCreateAd}/></>}/>

        {/* ESTOY AQUI */}
        {/* <Route path="/profile/:id" render={() => <PubliProfile ad={ad} onUpdateAd={handleOnUpdateAd}/>}/> */}

    </>
})
{/* <Route path="/register" render={() => token ? <Redirect to="/board" /> : <Register onRegister={handleRegister} onBack={handleGoBack} />} />
<Route path="/login" render={() => token ? <Redirect to="/board" /> : <Login onLogin={handleLogin} onBack={handleGoBack} />} />
<Route path="/board" render={() => token ? <Board user={name} tasks={tasks} onLogout={handleLogout} onChangeTaskStatus={handleChangeTaskStatus} onNewTask={handleNewTask} /> : <Redirect to="/" />} />
<Route path="/hello/:name" render={props => <Hello name={props.match.params.name} />} />
<Route path="/hello/:name" render={({ match: { params: { name } } }) => <Hello name={name} />} /> */}