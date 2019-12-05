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
import MyWishes from '../MyWishes'
import MyFriends from '../Friends'
import SavedWishes from '../SavedWishes'
import MyProfile from '../MyProfile'
import EditProfile from '../EditProfile'

//logic
import { registerUser, authenticateUser, retrieveUser, retrieveBirthdays, modifyUser, saveProfileImage, createWish, saveWishImage } from '../../logic'

export default withRouter(function ({ history }) {
	const [user, setUser] = useState({})
	//const [view, setView] = useState('')
	const [error, setError] = useState()
	const [birthdays, setBirthdays] = useState([])
	const [wishes, setWishes] = useState([])
	const [profileImage, setProfileImage] = useState(true)
	

	useEffect(() => {

        const { token } = sessionStorage;

        (async () => {
            if (token) {
                const user = await retrieveUser(token)

				setUser(user)

				const wishes = user.wishes

				setWishes(wishes)
            }
        })()
    }, [sessionStorage.token])


	async function handleRegister(name, surname, email, year, month, day, password, passwordconfirm){
		try{
			setError('')
			await registerUser(name, surname, email, year, month, day, password, passwordconfirm)
    
			history.push('/login')
		}catch(error){
			const { message } = error
			setError(message)
		}
	}

	async function handleLogin(email, password){
		try{
			setError('')
			const token = await authenticateUser(email, password)

			sessionStorage.token = token
			
			history.push('/landing')
			//retrieve friends bday that are in less than a week
			const birthdays = await retrieveBirthdays(token)
			setBirthdays(birthdays)


		}catch(error){
			const { message } = error
			setError(message)
		}
	}

	//modify the user profile 
	async function handleModify(image, day, month, year, password, description){
		try{
			const { token } = sessionStorage

			await modifyUser(token, day, month, year, password, description)

			if(image){
				let profileImage = await saveProfileImage(token, image)
				debugger
				setProfileImage(profileImage)
			}
			debugger
			
			const user = await retrieveUser(token)
			setUser(user)

			history.push('/myprofile')

		}catch(error){
			const { message } = error
			setError(message)
		}
	}

	//add a new wish
	async function handleAddWish(image, title, link, price, description){
		try{
			const { token } = sessionStorage

			const wishId = await createWish(token, title, link, price, description)

			if(image){
				await saveWishImage(token, wishId, image)
			}

			const user = await retrieveUser(token)

			setUser(user)

			const wishes = user.wishes
			setWishes(wishes)

			history.push('/mywishes')

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

	// functions to go to other panels
	async function handleLanding(){ 
		history.push('/landing')

		const birthdays = await retrieveBirthdays(token)
		setBirthdays(birthdays)
	}
	
	function handleGoRegister() { setError(''); history.push('/register') }

	function handleOnLogin() { setError(''); history.push('/login') }

	function handleOnCreateWish(){ history.push('/createwish')}

	function handleOnSearchFriends(){ history.push('/searchfriends')}

	function handleOnMyWishes() {history.push('/mywishes')}

	function handleOnMyFriends() {history.push('/myfriends')}

	function handleOnSavedWishes() {history.push('/savedwishes')}

	function handleOnMyProfile() {history.push('/myprofile')}

	function handleOnEditProfile(){history.push('/editprofile')}

	const { token } = sessionStorage

	return (
		<>
			<Route exact path="/" render={() => token ? <Redirect to="/landing" /> : <Welcome />} />
			<Route path='/register' render={() => token ? <Redirect to='/landing' /> : <Register onRegister={handleRegister} error={error} goLogin={handleOnLogin} />} />
			<Route path='/login' render={() => token ? <Redirect to='/landing' /> : <Login onLogin={handleLogin} error={error} goRegister={handleGoRegister}/>} />
			{token &&  <Header onLogout={handleLogout} onLanding={handleLanding} onMyWishes={handleOnMyWishes} onMyFriends={handleOnMyFriends} onSavedWishes={handleOnSavedWishes} onMyProfile={handleOnMyProfile} />}
			<Route path='/landing' render={()=> token ? <Landing user={user} birthdays={birthdays} onCreateWish={handleOnCreateWish} onSearchFriends={handleOnSearchFriends} profileImage={profileImage} />  : <Redirect to='/'/> } />
			<Route path='/createwish' render = {() => token ? <AddWish onMyWishes={handleOnMyWishes} onAddWish={handleAddWish} /> : <Redirect to='/'/> } />
			<Route path='/searchfriends' render = {() => token ? <SearchFriends/> : <Redirect to='/'/> } />
			<Route path='/mywishes' render = {() => token ? <MyWishes onCreateWish={handleOnCreateWish} wishes={wishes} user={user} /> : <Redirect to='/'/> } />
			<Route path='/myfriends' render = {() => token ? <MyFriends/> : <Redirect to='/'/> } />
			<Route path='/savedwishes' render = {() => token ? <SavedWishes/> : <Redirect to='/'/> } />
			<Route path='/myprofile' render = {() => token ? <MyProfile user={user} onEditProfile={handleOnEditProfile} profileImage={profileImage}/> : <Redirect to='/'/> } />
			<Route path='/editprofile' render = {() => token ? <EditProfile onMyProfile={handleOnMyProfile} onModify={handleModify} /> : <Redirect to='/'/> } />
		</>
	)
})


