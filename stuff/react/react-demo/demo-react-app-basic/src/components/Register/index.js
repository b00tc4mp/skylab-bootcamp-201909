import React from 'react'
import Feedback from '../Feedback'
import './index.sass'
import "../../styles/button.sass"


export default function ({ onError, onGoToLogin, onSubmit }) {

    return <div className="form-wrapper">
        <form onSubmit={onSubmit} className="form form__register">
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
                        <a href="" onClick={onGoToLogin}>Go to Login</a>
                    </div>
                </section>
            </fieldset>
        </form>
        {onError && <Feedback message={onError} />}
    </div>
}