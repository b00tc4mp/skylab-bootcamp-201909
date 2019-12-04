import React, { useState, useEffect } from 'react'
import {registerUser} from '../../logic'
import {authenticateUser} from '../../logic'
import { Route, withRouter, Redirect } from 'react-router-dom'

export default withRouter(function({ history }) {
    const [username, setUsername] = useState('')
    const [location, setLocation] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleRegister =async (e)=>{
        e.preventDefault()
        try {
            await registerUser(username, location, email, password)
            const token = await authenticateUser(username, password)
            sessionStorage.token = token
            history.push('/')
        } catch(error) {
            console.error(error)
        }
    }

    const isDisabled = !username || !location || !email || !password

    return <section className="register">
            <form onSubmit={handleRegister}>
                <h1 className="register__title">Register</h1>
                <input className="register__field" type="text" name="username" placeholder="username" onChange={({target})=>setUsername(target.value)} />
                <input className="register__field" type="text" name="location" placeholder="location" onChange={({target})=>setLocation(target.value)} />
                <input className="register__field" type="email" name="email" placeholder="e-mail" onChange={({target})=>setEmail(target.value)} />
                <input className="register__field" type="password" name="password" placeholder="password" onChange={({target})=>setPassword(target.value)} />
                <p className="register__subtitle">Add profile image</p><input type="file" name="filetoupload" className="register__addimg" />
                <button className="register__submit" disabled={isDisabled}>Register</button>
            </form>
        </section>
})