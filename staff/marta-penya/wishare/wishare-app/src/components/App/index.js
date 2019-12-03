import React, { useState, useEffect } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import './index.sass'
//components
import Welcome from '../Welcome'
import Register from '../Register'
import Login from '../Login'
import Header from '../Header'
import Landing from '../Landing'
import AddWish from '../AddWish'
import SearchFriends from '../SearchFriends'

//logic
import { registerUser, authenticateUser, retrieveUser, retrieveBirthdays } from '../../logic'

export default withRouter(function ({ history }) {
	const [name, setName] = useState()
	//const [view, setView] = useState('')
	const [error, setError] = useState()
	const [birthdays, setBirthdays] = useState()
	

	useEffect(() => {

        const { token } = sessionStorage;

        (async () => {
            if (token) {
                const { name } = await retrieveUser(token)

                setName(name)
            }
        })()
    }, [sessionStorage.token])


	async function handleRegister(name, surname, email, year, month, day, password, passwordconfirm){
		try{
			await registerUser(name, surname, email, year, month, day, password, passwordconfirm)
    
			history.push('/login')
		}catch(error){
			const { message } = error
			setError(message)
		}
	}

	async function handleLogin(email, password){
		try{
			const token = await authenticateUser(email, password)

			sessionStorage.token = token
    
			history.push('/landing')

			const birthdays = await retrieveBirthdays(token)
			setName(birthdays)


		}catch(error){
			const { message } = error
			setError(message)
		}
	}

	//header logout function to clear token 
    function handleLogout() {
        sessionStorage.clear()

        history.push('/')
	}

	function handleLanding(){ history.push('/landing')}
	
	function handleOnCreateWish(){ history.push('/createwish')}

	function handleOnSearchFriends(){ history.push('/searchfriends')}


	const { token } = sessionStorage

	return (
		<>
			<Route exact path="/" render={() => token ? <Redirect to="/landing" /> : <Welcome />} />
			< Route path='/register' render={() => token ? <Redirect to='/landing' /> : <Register onRegister={handleRegister} error={error} />} />
			< Route path='/login' render={() => token ? <Redirect to='/landing' /> : <Login onLogin={handleLogin} error={error}/>} />
			{token &&  <Header onLogout={handleLogout} onLanding={handleLanding} />}
			< Route path='/landing' render={()=> token ? <Landing name={name} birthdays={birthdays} onCreateWish={handleOnCreateWish} onSearchFriends={handleOnSearchFriends} />  : <Redirect to='/'/> } />
			<Route path='/createwish' render = {() => token ? <AddWish/> : <Redirect to='/'/> } />
			<Route path='/searchfriends' render = {() => token ? <SearchFriends/> : <Redirect to='/'/> } />

		</>
	)
})


