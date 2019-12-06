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
import EditWish from '../EditWish'

//logic
import { registerUser, authenticateUser, retrieveUser, retrieveBirthdays, modifyUser, saveProfileImage, createWish, saveWishImage, modifyWish, removeWish, givenWish, searchUsers, addFriend, retrieveFriends, deleteFriend } from '../../logic'

export default withRouter(function ({ history }) {

	const [user, setUser] = useState({})
	const [error, setError] = useState()
	const [birthdays, setBirthdays] = useState([])
	const [wishes, setWishes] = useState([])
	const [profileImage, setProfileImage] = useState(true)
	const [idWish, setIdWish] = useState()
	const [users, setUsers] = useState([])
	const [friends, setFriends] = useState([])
	const [render, setRender] = useState(true)


	useEffect(() => {

		const { token } = sessionStorage;

		(async () => {
			if (token) {

				const user = await retrieveUser(token)

				setUser(user)

				const wishes = user.wishes

				setWishes(wishes)

				const friends = await retrieveFriends(token)

				setFriends(friends)

				const birthdays = await retrieveBirthdays(token)
				setBirthdays(birthdays)
			}
		})()
	}, [sessionStorage.token])


	async function handleRegister(name, surname, email, year, month, day, password, passwordconfirm) {
		try {
			setError('')
			await registerUser(name, surname, email, year, month, day, password, passwordconfirm)

			history.push('/login')
		} catch (error) {
			const { message } = error
			setError(message)
		}
	}

	async function handleLogin(email, password) {
		try {
			setError('')
			const token = await authenticateUser(email, password)

			sessionStorage.token = token

			history.push('/landing')
			//retrieve friends bday that are in less than a week
			const birthdays = await retrieveBirthdays(token)
			setBirthdays(birthdays)


		} catch (error) {
			const { message } = error
			setError(message)
		}
	}

	//modify the user profile 
	async function handleModify(image, day, month, year, password, description) {
		try {
			const { token } = sessionStorage

			await modifyUser(token, day, month, year, password, description)

			if (image) {
				let profileImage = await saveProfileImage(token, image)

				setProfileImage(profileImage)
			}

			const user = await retrieveUser(token)
			setUser(user)

			history.push('/myprofile')

		} catch (error) {
			const { message } = error
			setError(message)
		}
	}

	//add a new wish
	async function handleAddWish(image, title, link, price, description) {
		try {
			const { token } = sessionStorage

			const wishId = await createWish(token, title, link, price, description)

			if (image) {
				await saveWishImage(token, wishId, image)
			}

			sessionStorage.token = token

			const user = await retrieveUser(token)

			setUser(user)

			const wishes = user.wishes
			setWishes(wishes)

			history.push('/mywishes')

		} catch (error) {
			const { message } = error
			setError(message)
		}
	}

	//modify an existent wish

	async function handleEditWish(image, title, link, price, description) {
		try {
			const { token } = sessionStorage

			await modifyWish(token, idWish, title, link, price, description)

			if (image) {
				await saveWishImage(token, idWish, image)
			}

			const user = await retrieveUser(token)

			setUser(user)

			history.push('/mywishes')

		} catch (error) {
			const { message } = error
			setError(message)
		}
	}
	//delete a wish

	async function handleDeleteWish(id) {
		try {
			const { token } = sessionStorage

			await removeWish(token, id)

			const user = await retrieveUser(token)

			setUser(user)

			const wishes = user.wishes
			setWishes(wishes)

			history.push('/mywishes')

		} catch (error) {
			const { message } = error
			setError(message)
		}
	}

	//mark a gift as given or not given

	async function handleGivenWish(id) {
		try {
			const { token } = sessionStorage
			await givenWish(token, id)

			history.push('/mywishes')

		} catch (error) {
			const { message } = error
			setError(message)
		}

	}

	// search users by their e-mail

	async function handleSearch(query) {
		try {
			setError('')
			const users = await searchUsers(query)

			setUsers(users)

			history.push('/searchfriends')
		} catch (error) {
			const { message } = error
			setError(message)
		}
	}

	//add a friend

	async function handleAddFriend(friendId) {
		try {
			const { token } = sessionStorage

			await addFriend(token, friendId)

			const user = await retrieveUser(token)
			
			setUser(user)
			
			const friends = await retrieveFriends(token)
			
			setFriends(friends)

			setRender(!render)
			
			history.push('/myfriends')

		} catch (error) {
			const { message } = error
			setError(message)
		}
	}

	//delete a friend

	async function handleDeleteFriend(friendId) {
		try {
			const { token } = sessionStorage

			await deleteFriend(token, friendId)

			const user = await retrieveUser(token)

			setUser(user)

			const friends = await retrieveFriends(token)

			setFriends(friends)

			history.push('/myfriends')

		} catch (error) {
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
	async function handleLanding() {
		history.push('/landing')

		const birthdays = await retrieveBirthdays(token)
		setBirthdays(birthdays)
	}

	function handleGoRegister() { setError(''); history.push('/register') }

	function handleOnLogin() { setError(''); history.push('/login') }

	function handleOnCreateWish() { history.push('/createwish') }

	function handleOnSearchFriends() { setError(''); setUsers([]); history.push('/searchfriends') }

	function handleOnMyWishes() { history.push('/mywishes') }

	function handleOnMyFriends() { history.push('/myfriends') }

	function handleOnSavedWishes() { history.push('/savedwishes') }

	function handleOnMyProfile() { history.push('/myprofile') }

	function handleOnEditProfile() { history.push('/editprofile') }

	function handleOnEditWish(id) { setIdWish(id); history.push('/editwish') }

	const { token } = sessionStorage

	return (
		<>
			<Route exact path="/" render={() => token ? <Redirect to="/landing" /> : <Welcome />} />
			<Route path='/register' render={() => token ? <Redirect to='/landing' /> : <Register onRegister={handleRegister} error={error} goLogin={handleOnLogin} />} />
			<Route path='/login' render={() => token ? <Redirect to='/landing' /> : <Login onLogin={handleLogin} error={error} goRegister={handleGoRegister} />} />
			{token && <Header onLogout={handleLogout} onLanding={handleLanding} onMyWishes={handleOnMyWishes} onMyFriends={handleOnMyFriends} onSavedWishes={handleOnSavedWishes} onMyProfile={handleOnMyProfile} user={user} />}
			<Route path='/landing' render={() => token ? <Landing user={user} birthdays={birthdays} onCreateWish={handleOnCreateWish} onSearchFriends={handleOnSearchFriends} profileImage={profileImage} /> : <Redirect to='/' />} />
			<Route path='/createwish' render={() => token ? <AddWish onMyWishes={handleOnMyWishes} onAddWish={handleAddWish} /> : <Redirect to='/' />} />
			<Route path='/searchfriends' render={() => token ? <SearchFriends onSearch={handleSearch} users={users} error={error} onMyFriends={handleOnMyFriends} addFriend={handleAddFriend} /> : <Redirect to='/' />} />
			<Route path='/mywishes' render={() => token ? <MyWishes onCreateWish={handleOnCreateWish} wishes={wishes} user={user} onEditWish={handleOnEditWish} deleteWish={handleDeleteWish} givenWish={handleGivenWish} /> : <Redirect to='/' />} />
			<Route path='/myfriends' render={() => token ? <MyFriends onSearchFriends={handleOnSearchFriends} friends={friends} deleteFriend={handleDeleteFriend} /> : <Redirect to='/' />} />
			<Route path='/savedwishes' render={() => token ? <SavedWishes /> : <Redirect to='/' />} />
			<Route path='/myprofile' render={() => token ? <MyProfile user={user} onEditProfile={handleOnEditProfile} profileImage={profileImage} /> : <Redirect to='/' />} />
			<Route path='/editprofile' render={() => token ? <EditProfile onMyProfile={handleOnMyProfile} onModify={handleModify} /> : <Redirect to='/' />} />
			<Route path='/editwish' render={() => token ? <EditWish onEditWish={handleEditWish} onMyWishes={handleOnMyWishes} /> : <Redirect to='/' />} />
		</>
	)
})


