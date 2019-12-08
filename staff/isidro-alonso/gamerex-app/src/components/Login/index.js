import React, { useState } from 'react'
import {authenticateUser} from '../../logic'
import { Link, withRouter } from 'react-router-dom'
import Feedback from '../Feedback'

export default withRouter(function({ history }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState('')

    const handleLogin = async (e)=>{
        e.preventDefault()
        try {
            const token = await authenticateUser(username, password)
            sessionStorage.token = token
            history.push('/')
          
        } catch (error) {
            setError(error.message.toString())
        }
    }

    const isDisabled = !username || !password

    return <section className="login">
    {error && <Feedback message={error} />}
    <form onSubmit={handleLogin}>
        <h1 className="login__title">Login to access to all the contents</h1>
        <input className="login__field" type="text" name="username" placeholder="username" onChange={({target})=>setUsername(target.value)}/>
        <input className="login__field" type="password" name="password" placeholder="password" onChange={({target})=>setPassword(target.value)}/>
        <button className="login__submit" disabled={isDisabled}>Login</button>
        <p className="login__gotoregister">Are you not registered?<br />
            <Link to='/register'>
                Sign up now!
            </Link>
        </p>
    </form>
</section>
})