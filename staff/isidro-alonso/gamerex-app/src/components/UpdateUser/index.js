import React, { useState, useEffect } from 'react'
import { modifyUser } from '../../logic'
import { Route, withRouter, Redirect } from 'react-router-dom'

export default withRouter(function ({ history }) {

    const { location: { pathname } } = history
    const id = pathname.substr(12)

    const [username, setUsername] = useState('')
    const [location, setLocation] = useState('')
    const [password, setPassword] = useState('')

    async function handleUpdateUser(username, location, password) {
        try {
            const { token } = sessionStorage

            await modifyUser(token, id, username, location, password)

            history.push('/myuser')

        } catch (error) {
            console.error(error)
        }
    }

    const isDisabled = !username || !location || !password

    return <section className="updateprofile">
        <form onSubmit={e => {
            e.preventDefault()

            handleUpdateUser(username, location, password)
            setUsername('')
            setLocation('')
            setPassword('')

        }}>
            <h1 className="updateprofile__title">Update profile</h1>
            <input className="updateprofile__field" type="text" name="username" placeholder="username" onChange={event => setUsername(event.target.value)} />
            <input className="updateprofile__field" type="text" name="location" placeholder="location" onChange={event => setLocation(event.target.value)} />
            <input className="updateprofile__field" type="password" name="password" placeholder="password" onChange={event => setPassword(event.target.value)} />
            <p className="updateprofile__subtitle">Update profile image</p><input type="file" name="filetoupload" className="updateprofile__addimg" />
            <button className="updateprofile__submit" disabled={isDisabled}>Update</button>
        </form>
    </section>
})