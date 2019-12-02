import React, { useState, useEffect } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import { retrieveUser } from '../../logic'
import GameList from '../GameList'

export default withRouter(function ({ history }) {
    
    const [username, setUsername] = useState()
    const [location, setLocation] = useState()
    const [email, setEmail] = useState()

    const { location: { pathname } } = history
    const userId = pathname.substr(10)

    useEffect(() => {
        const { token } = sessionStorage;

        (async () => {
            if (token) {
                const { username, location, email } = await retrieveUser(token, userId)

                setUsername(username)
                setLocation(location)
                setEmail(email)

            }
        })()
    }, [sessionStorage.token])

    return <section className="user-profile">
        <h1 className="user-profile__title">{username}</h1>
        <section className="user-profile__item">
            <img className="user-profile__img" src="img/dummy-user.png" alt="user" />
            <p className="user-profile__location">{location}</p>
            <p className="user-profile__email">{email}</p>
        </section>
        <h1 className="user-profile__title">{username}'s game collection</h1>
        <GameList />
    </section>
})