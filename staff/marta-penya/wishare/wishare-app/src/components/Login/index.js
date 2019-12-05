import React from 'react'
import './index.sass'
import { withRouter } from 'react-router-dom'
import Feedback from '../Feedback'

export default function({ goRegister, onLogin, error }){


    return <section className="login">

    <h1 className="login__title">Login</h1>

    {error && < Feedback message={error} />}

    <form className="login__form" onSubmit={function(event){
        event.preventDefault()

        const { email: {value : email}, password: {value: password}} = event.target

        onLogin(email, password)
    }} >
        <label>E-mail</label>
        <input className="login__field" type="email" name="email" placeholder="e-mail"/>
        <label>Password</label>
        <input className="register__field" type="password" name="password" placeholder="*******"/>
        <button className="register__submit">Login</button>
    </form>
    <span>Not registered yet?</span> <a href='' onClick={event => { event.preventDefault(); goRegister() }}>Register</a>
</section>

}