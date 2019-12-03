import React from 'react'
import './index.sass'
import Feedback from '../Feedback'

export default function({ onLogin, onBack, error }) {
    return <section classsName="login">
        <h3 classsName="login__title">Login</h3>
        <form classsName="login__form" onSubmit={function (event) { 

            event.preventDefault()

            const { username: { value: username }, password: { value: password } } = event.target

            onLogin(username, password)
        
        }}>
            <input classsName="login__field" type="username" name="username" placeholder="username"/>
            <input classsName="login__field" type="password" name="password" placeholder="password"/>
            <button classsName="login__button">Submit</button>
            <a className="login__back" href="" onClick={event => {
                            event.preventDefault()

                            onBack()
                        }}>Go back</a>
        </form>

        {error && <Feedback message={error} />}
</section>

}