import React from 'react'
import './index.sass'

export default function({ message }) {

    return <section className="feedback">
        <span className="feedback__icon">👎🏼</span>
        <p className="feedback__message">{message}</p>
        <span className="feedback__icon">👎🏼</span>
    </section>


}
