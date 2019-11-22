import React, { useContext } from 'react'
import Feedback from '../Feedback'
import './index.sass'
import "../../styles/button.sass"
import Context from '../CreateContext'
import logic from '../../logic' 


export default function ({ error }) {

    const { setView, setError } = useContext(Context)

    const handleGoToLogin = event => {
        event.preventDefault();
        setView('login');
    }

    const handleRegister = async event => {
        event.preventDefault()
        const { target: { username: { value: username }, email: { value: email }, password: { value: password }, repassword: { value: repassword } } } = event
        try {
            await logic.registerUser(username, email, password, repassword)
        }
        catch ({ message }) {
            setError(message)
        }
    }

    return <div className="form-wrapper">
        <form onSubmit={handleRegister} className="form form__register">
            <fieldset className="fieldset">
                <legend className="fieldset__legend">
                    Register
                        </legend>
                <section className="fieldset__body">
                    <div className="input-block">
                        <label className="input-block__label" htmlFor="username">username</label>
                        <input className="input-block__input" type="text" name="username" />
                    </div>
                    <div className="input-block">
                        <label className="input-block__label" htmlFor="email">email</label>
                        <input className="input-block__input" type="text" name="email" />
                    </div>
                    <div className="input-block">
                        <label className="input-block__label" htmlFor="password">password</label>
                        <input className="input-block__input" type="password" name="password" />
                    </div>
                    <div className="input-block">
                        <label className="input-block__label" htmlFor="repassword">confirm password </label>
                        <input className="input-block__input" type="password" name="repassword" />
                    </div>
                    <div className="btn-set-form">
                        <button className="btn btn--submit">Register</button>
                        <button className="btn btn--back" href=" " onClick={handleGoToLogin}>Go to Login</button>
                    </div>
                </section>
            </fieldset>
        </form>
        {error && <Feedback message={error} />}
    </div>
}