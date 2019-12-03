import React from 'react'
import './index.sass'

export default function({ onRegister, onLogin }) {

    return <section>
    
        <section className="view landing">

        <h1 className="landing__title">pyrene</h1>
        <h2 className="landing__subtitle">ski</h2>
        </section>

        <section class="landing">
        <h3 class="landing__options">Please, proceed to <a href="" onClick={event => { event.preventDefault(); onLogin() } }>LOGIN</a> or <a href="" onClick={event => { event.preventDefault(); onRegister()}}>REGISTER</a>.</h3>
        </section>

    </section>
}
