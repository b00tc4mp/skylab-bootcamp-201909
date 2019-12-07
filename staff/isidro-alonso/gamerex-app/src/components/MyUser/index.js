import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { retrieveMyUser } from '../../logic'
import MyGameList from '../MyGameList'
import Feedback from '../Feedback'
const API_URL = process.env.REACT_APP_API_URL

export default withRouter(function ({ history }) {
    const [id, setId] = useState()
    const [username, setUsername] = useState()
    const [location, setLocation] = useState()
    const [email, setEmail] = useState()

    const [error, setError] = useState('')

    useEffect(() => {
        const { token } = sessionStorage;

        (async () => {
            if (token) {
                const { id, username, location, email } = await retrieveMyUser(token)

                setId(id)
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
            setError(error.toString())
        }
    }

    const userIdLink = `/updateuser/${id}`

    const userIdImgLink = `/updateimguser/${id}`

    const image = `${API_URL}/users/load/${id}?timestamp=${Date.now()}`

    return <section className="user-profile">
        {error && <Feedback message={error} />}
        <h1 className="user-profile__title">{username}</h1>
        <section className="user-profile__item">
            <Link to={userIdImgLink}>
                <img className="user-profile__img" src={image} alt="user" />
            </Link>
            <p className="user-profile__location">{location}</p>
            <p className="user-profile__email">{email}</p>
            <Link to={userIdLink}>
                <button className="user-profile__update">Update profile info</button>
            </Link>
            <Link to={userIdImgLink}>
                <button className="user-profile__update">Update profile image</button>
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