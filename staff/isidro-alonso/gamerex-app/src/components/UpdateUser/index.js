import React, { useState, useEffect } from 'react'
// import {registerUser} from '../../logic' //crear logica de update user
import { authenticateUser } from '../../logic'
import { Route, withRouter, Redirect } from 'react-router-dom'

export default withRouter(function ({ history }) {
    const [username, setUsername] = useState('')
    const [location, setLocation] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleUpdateUser = async (e) => {
        e.preventDefault()
        try {
            // await registerUser(username, location, email, password) //crear logica de update user
            const token = await authenticateUser(username, password)
            sessionStorage.token = token
            history.push('/myuser')
        } catch (error) {
            console.error(error)
        }
    }
    return <section className="updateprofile">
        <form onSubmit={handleUpdateUser}>
            <h1 className="updateprofile__title">Update profile</h1>
            <input className="updateprofile__field" type="text" name="username" placeholder="username" />
            <input className="updateprofile__field" type="text" name="location" placeholder="location" />
            <input className="updateprofile__field" type="email" name="email" placeholder="e-mail" />
            <input className="updateprofile__field" type="password" name="password" placeholder="password" />
            <button className="updateprofile__addimg">Update profile image</button>
            <button className="updateprofile__submit">Update</button>
        </form>
    </section>
})