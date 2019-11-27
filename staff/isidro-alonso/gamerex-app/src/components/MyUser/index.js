import React, { useState, useEffect } from 'react'
import { Link, Route, withRouter, Redirect } from 'react-router-dom'
import { retrieveUser } from '../../logic'
import MyGameList from '../MyGameList'

export default withRouter(function ({ history }) {
    const [username, setUsername] = useState()
    const [location, setLocation] = useState()
    const [email, setEmail] = useState()

    useEffect(() => {
        const { token } = sessionStorage;

        (async () => {
            if (token) {
                const { username, location, email } = await retrieveUser(token)

                setUsername(username)
                setLocation(location)
                setEmail(email)

            }
        })()
    }, [sessionStorage.token])

    const handleLogout = async (e) => {
        e.preventDefault()
        try {
            await sessionStorage.clear()
            history.push('/')

        } catch (error) {
            console.error(error)
        }
    }

    return <section className="user-profile">
        <h1 className="user-profile__title">{username}</h1>
        <section className="user-profile__item">
            <img className="user-profile__img" src="img/profile.png" alt="user" />
            <p className="user-profile__location">{location}</p>
            <p className="user-profile__email">{email}</p>
            <p className="user-profile__numofgames">XX games</p>
            <Link to='/updateuser'>
                <button className="user-profile__update">Update profile</button>
            </Link>
            <button className="user-profile__logout" onClick={handleLogout}>Logout</button>
        </section>
        <h1 className="user-profile__title">{username}'s game collection</h1>
        <section className="game-list">
            <Link to='/newgame' className="new-game__link">
                <button className="new-game">Add a new game</button>
            </Link>
        </section>
        <MyGameList />
    </section>
})