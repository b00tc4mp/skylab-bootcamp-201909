import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { retrieveUser } from '../../logic'
import GameList from '../GameList'
const API_URL = process.env.REACT_APP_API_URL

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

    const image = `${API_URL}/users/load/${userId}?timestamp=${Date.now()}`

    return <section className="user-profile">
        <h1 className="user-profile__title">{username}</h1>
        <section className="user-profile__item">
            <img className="user-profile__img" src={image} alt="user" />
            <p className="user-profile__location">{location}</p>
            <p className="user-profile__email">{email}</p>
        </section>
        <h1 className="user-profile__title">{username}'s game collection</h1>
        <GameList />
    </section>
})