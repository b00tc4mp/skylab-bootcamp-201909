import React, { useContext } from 'react'
import Feedback from '../Feedback'
import Context from '../CreateContext'
import logic from '../../logic'
import './index.sass'


export default function ({ error, onUser }){

    const { setView, setError } = useContext(Context)

    const handleLogin = async event => {
        event.preventDefault()
        const { target: { email: { value: email }, password: { value: password } } } = event
        try {
            await logic.authenticateUser(email, password)
            onUser(await logic.retrieveUser())
            setView('home')
        }
        catch ({ message }) {
            setError(message)
        }
    }

    const handleGoToRegister = event => {
        event.preventDefault();
        setView('register')
    }

    return  <div className="form-wrapper form-wrapper--login">
                <form onSubmit = {handleLogin} className="form form__register">
                    <fieldset className="fieldset">
                        <legend className="fieldset__legend">
                            Login
                        </legend>
                        <section className="fieldset__body">
                            <div className="input-block">
                                <label className="input-block__label" htmlFor="email">email</label>
                                    <input className="input-block__input" type="text" name="email"  />
                            </div>
                            <div className="input-block">
                                <label className="input-block__label" htmlFor="password" autoComplete="username">password</label>
                                    <input className="input-block__input" type="password" name="password" autoComplete="current-password"  />
                            </div>
                            <div className="btn-set-form">
                                <button className="btn btn--submit">Login</button>
                                <button className="btn btn--back" href=" " onClick={handleGoToRegister}>Go to Register</button>
                            </div>
                        </section>
                    </fieldset>
                </form>
                {error && <Feedback message ={error}/>}
                
            </div>
}
