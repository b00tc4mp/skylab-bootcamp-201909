import React, { useState } from 'react'
import {registerUser} from '../../logic'
import {authenticateUser} from '../../logic'
import { withRouter } from 'react-router-dom'
import Feedback from '../Feedback'

export default withRouter(function({ history }) {
    const [username, setUsername] = useState('')
    const [location, setLocation] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState('')

    const handleRegister =async (e)=>{
        e.preventDefault()
        try {
            await registerUser(username, location, email, password)
            const token = await authenticateUser(username, password)
            sessionStorage.token = token
            history.push('/')
        } catch(error) {
            setError(error.message.toString())
        }
    }

    const isDisabled = !username || !location || !email || !password

    return <section className="register">
        {error && <Feedback message={error} />}
            <form onSubmit={handleRegister}>
                <h1 className="register__title">Register</h1>
                <input className="register__field" type="text" name="username" placeholder="username" onChange={({target})=>setUsername(target.value)} />
                <input className="register__field" type="text" name="location" placeholder="location" onChange={({target})=>setLocation(target.value)} />
                <input className="register__field" type="email" name="email" placeholder="e-mail" onChange={({target})=>setEmail(target.value)} />
                <input className="register__field" type="password" name="password" placeholder="password" onChange={({target})=>setPassword(target.value)} />
                {/* <p className="register__subtitle">Add profile image</p><input type="file" name="filetoupload" className="register__addimg" /> */}
                <button className="register__submit" disabled={isDisabled}>Register</button>
            </form>
        </section>
})