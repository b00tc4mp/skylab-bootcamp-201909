import React, { useState, useEffect } from 'react';
import './index.sass'
import Register from '../Register'
import Header from '../Header'
import Login from '../Login'
import Landing from '../Landing'
import Search from '../Search'
import Detail from '../Detail'
import Profile from '../Profile'
import ModifyAd from '../ModifyAd'
import CreateAd from '../CreateAd'
import Favorites from '../Favorites'
import Chats from '../Chats'
import Messages from '../Messages'

import Footer from '../Footer'
import PublicProfile from '../PublicProfile'
import { Route, withRouter, Redirect } from 'react-router-dom'
import { authenticateUser, registerUser, retrieveUser, searchAds, retrieveAd, retrievePublicUser, retrieveAds, removeAd, modifyAd, saveImageAd, modifyUser, saveImageProfile, 
         createAd, retrievePublicAds, retrieveComments, addComment, retrieveFavs, toggleFavAd, retrieveChats, retrieveChat, addMessage, removeChat, createChat} from '../../logic'

import queryString from 'query-string'


export default withRouter(function ({ history }) {
    const [ads, setAds] = useState([])
    const [adId, setAdId] = useState([])
    const [ad, setAd] = useState([])
    const [user, setUser] = useState([])
    const [idPublic, setIdPublic] = useState([])
    const [comments, setComments] = useState([])
    const [chats, setChats] = useState([])
    const [chat, setChat] = useState([])

    //history.pathname.split('/')

    useEffect(() => {
        const { token } = sessionStorage;      

        (async () => {
            if (token) {

                const user = await retrieveUser(token)

                // const ads = await retrieveAds(token)
                const ads = await searchAds(token, " ")

                setAds(ads)   
                setUser(user)
            }
        })()
    }, [sessionStorage.token])


    function handleGoBack(webant) { 

        history.goBack()
        // history.push(`/${webant}`) 
    }

    function handleLogout() {
        sessionStorage.clear()
        history.push('/')
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
            

            history.push('/search')
        } catch (error) {
            console.error(error)
        }
    }

    async function handleSearch(query) {
        try {
            // const token = sessionStorage.token
            const ads = await searchAds(token, query)

            setAds(ads)

            history.push("/search")

        } catch (error) {
            console.error(error)
        }
    }

    async function handleAdDetail(adId) {
        try {
            const token = sessionStorage.token
            const ad = await retrieveAd(token, adId)
            const { name, id } = await retrievePublicUser(ad.user)

            ad.name = name
            ad.idPublic = id

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

            const ad = await retrieveAd(token, adId)

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

            const ad = await retrieveAd(token, adId)

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
            const ad = await retrieveAd(token, adId)

            setAd(ad)  
            setUser(user)            

           history.push(`/ad/${adId}`)

        } catch (error) {
            console.error(error)
        }  
    }

    async function handleToPubliProfile(id) {   
        try {
            const token = sessionStorage.token 
            let user = ""
            let ads = []
            let idPublic = ""

            if (!id) {
                user = await retrieveUser(token)
                id = user.id
                ads = await retrieveAds(token)



            } else {
                user = await retrievePublicUser(id)
                id = user.id
                ads = await retrievePublicAds(token, id)
                idPublic = id
                setIdPublic(idPublic)  

            } 
            const comments = await retrieveComments(id)

            setAds(ads)   
            setUser(user)
            setComments(comments)

            history.push(`/publicprofile/${id}`)
        } catch(error) {
            console.error(error)
        }
  
    }

    async function handleCreateComment(comment, id) {  

        try {
        if (comment != "") {
            const token = sessionStorage.token 
  
            const idComment = await addComment(token, id, comment)

            const comments = await retrieveComments(id)

            setComments(comments)

        }
        
        history.push(`/publicprofile/${id}`)
        }catch(error){
            console.log(error)
        }
  
    }

    async function handleToFavorites() { 
        
        try {
        const token = sessionStorage.token   

        const ads = await retrieveFavs(token)

        setAds(ads)   
    
        history.push(`/favorites`)
        }catch(error){
            console.log(error)
        }
  
    }

    async function handleFav() { 
        try {

        const token = sessionStorage.token   

        const ads = await retrieveFavs(token)

        setAds(ads)   
    
        history.push(`/favorites`)
        }catch(error){
            console.log(error)
        }
  
    }

    async function handleOnFav(id, comeFrom) { 

        try {
        const token = sessionStorage.token   

        await toggleFavAd(token, id)
        
        const ads = await retrieveAds(token)

        setAds(ads)   
    
        history.push(`/${comeFrom}`)
        }catch(error){
            console.log(error)
        }
  
    }

    async function handleToChats() { 

        try {
        const token = sessionStorage.token   
        
        const chats = await retrieveChats(token)
        const user = await retrieveUser(token)

        setUser(user)
        setChats(chats)   
    
        history.push(`/chats`)

        }catch(error){
            console.log(error)
        }
  
    }

    async function handleToChat(idChat) { 

        try {
        const token = sessionStorage.token   
        
        const chat = await retrieveChat(token, idChat)
        const user = await retrieveUser(token)

        chat.idChat = idChat

        setUser(user)
        setChat(chat)   
    
        history.push(`/chat/${idChat}`)

        }catch(error){
            console.log(error)
        }
  
    }

    async function handleDeleteChat(idChat) { 

        try {
        const token = sessionStorage.token   
        
        await removeChat(token, idChat)
        const chats = await retrieveChats(token)
        const user = await retrieveUser(token)

        setUser(user)
        setChats(chats)   
    
        history.push(`/chats`)

        }catch(error){
            console.log(error)
        }
  
    }

    async function handleCreateMessage(message, idChat) { 
        try {
        if (message != "") {
            const token = sessionStorage.token 
  
            const idMessage = await addMessage(token, idChat, message)

            const chat = await retrieveChat(token, idChat)

            chat.idChat = idChat

            setUser(user)
            setChat(chat)   

        }
        
        history.push(`/chat/${idChat}`)
        }catch(error){
            console.log(error)
        }
  
    }

    async function handleCreateChat(idPublic) { 

        try {
        const token = sessionStorage.token   

        const idChat = await createChat(token, idPublic)
        
        const chat = await retrieveChat(token, idChat)
        const user = await retrieveUser(token)

        chat.idChat = idChat

        setUser(user)
        setChat(chat)   
    
        history.push(`/chat/${idChat}`)

        }catch(error){
            console.log(error)
        }
  
    }


    const { token } = sessionStorage

    return <>
        {/* <Route exact path="/" render={() => <Header onBack={handleGoBack}/>} /> */}
        <Route exact path="/" render={() => <><Landing onLogin={handleGoToLogin} onRegister={handleGoToRegister}/><Footer/></>}/> 
        <Route path="/register" render={() => <><Header onBack={handleGoBack}/>  <Register onRegister={handleRegister}/></>}/> 
        <Route path="/login" render={() => <><Header onBack={handleGoBack}/> <Login onLogin={handleLogin}/></>}/>  
        <Route path="/search" render={() => <><Search onSearch={handleSearch} onLogout={handleLogout} ads={ads} adDetail={handleAdDetail} onProfile={handleProfile} onToCreateAd={handleToCreateAd} onToPubliProfile={handleToPubliProfile}
                                                      onToFavorites={handleToFavorites} onFav={handleOnFav} onToChats={handleToChats}/></>}/> 
        <Route path="/ad/:adId" render={() => <><Header onBack={handleGoBack}/><Detail ad={ad} user={user} onCreateChat={handleCreateChat} onToPubliProfile={handleToPubliProfile}/></>}/> 
        <Route path="/profile" render={() => <><Header onBack={handleGoBack}/><Profile ads={ads} user={user} adDetail={handleAdDetail} onDeleteAd={handleDeleteAd} onToUpdateAd={handleToUpdateAd} onUpdateUser={handleUpdateUser}/></>}/> 
        <Route path="/update/:adId" render={() => <><Header onBack={handleGoBack}/><ModifyAd ad={ad} onUpdateAd={handleOnUpdateAd}/></>}/>
        <Route path="/newad" render={() => <><Header onBack={handleGoBack}/><CreateAd onCreateAd={handleCreateAd}/></>}/>
        <Route path="/publicprofile/:id" render={() => <><Header onBack={handleGoBack}/> <PublicProfile comments={comments} ads={ads} user={user} adDetail={handleAdDetail} OnCreateComment={handleCreateComment}/></>}/>
        <Route path="/favorites" render={() => <><Header onBack={handleGoBack}/><Favorites ads={ads} adDetail={handleAdDetail} onFav={handleOnFav}/></>}/>
        <Route path="/chats" render={() => <><Header onBack={handleGoBack}/><Chats chats={chats} user={user} onDeleteChat={handleDeleteChat} onChat={handleToChat}/></>}/>
        <Route path="/chat/:chatId" render={() => <><Header onBack={handleGoBack}/><Messages chat={chat} user={user} OnCreateMessage={handleCreateMessage}/></>}/> 
    </>
})
{/* <Route path="/register" render={() => token ? <Redirect to="/board" /> : <Register onRegister={handleRegister} onBack={handleGoBack} />} />
<Route path="/login" render={() => token ? <Redirect to="/board" /> : <Login onLogin={handleLogin} onBack={handleGoBack} />} />
<Route path="/board" render={() => token ? <Board user={name} tasks={tasks} onLogout={handleLogout} onChangeTaskStatus={handleChangeTaskStatus} onNewTask={handleNewTask} /> : <Redirect to="/" />} />
<Route path="/hello/:name" render={props => <Hello name={props.match.params.name} />} />
<Route path="/hello/:name" render={({ match: { params: { name } } }) => <Hello name={name} />} /> */}