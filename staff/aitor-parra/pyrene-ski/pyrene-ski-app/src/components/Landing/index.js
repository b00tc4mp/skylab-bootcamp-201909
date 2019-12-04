import React from 'react'
import { Link } from 'react-router-dom'
import '../../../src/index.sass'

export default function() {

    return <section>
    
        <section className="view landing">

        <h1 className="landing__title">pyrene</h1>
        <h2 className="landing__subtitle">ski</h2>
        </section>

        <section className="landing">
        <h3 className="landing__options">Please, proceed to <Link to="/login">LOGIN</Link> or <Link to="/register" >REGISTER</Link>.</h3>
        </section>

    </section>
}
