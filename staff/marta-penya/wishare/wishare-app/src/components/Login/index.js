import React from 'react'
import './index.sass'
import { withRouter } from 'react-router-dom'

export default withRouter (function({ history }){

    function handleGoRegister() { history.push('/register') }

    return <section className="login">

    <h1 className="login__title">Login</h1>

 {/* {error && < Feedback message={error} />} */}

    <form className="login__form">
        <label>E-mail</label>
        <input className="login__field" type="email" name="email" placeholder="e-mail"/>
        <label>Password</label>
        <input className="register__field" type="password" name="password" placeholder="password"/>
        <button className="register__submit">Login</button>
    </form>
    <span>Not registered yet?</span> <a href='' onClick={event => { event.preventDefault(); handleGoRegister() }}>Register</a>
</section>

})