import React from 'react'
import Feedback from '../Feedback'
import './index.sass'


export default function ({onError, onBack, onSubmit}){

    return  <div className="form-wrapper form-wrapper--login">
                <form onSubmit = {onSubmit} className="form form__register">
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
                                <button className="btn btn--back" onClick={onBack}>Go to Register</button>
                            </div>
                        </section>
                    </fieldset>
                </form>
                {onError && <Feedback message ={onError}/>}
                
            </div>
}
