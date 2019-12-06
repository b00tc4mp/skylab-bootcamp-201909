import React from 'react'
import './index.sass'

export default function ({ onClose}) {
    return <section className="waiting">
        <div className="waiting__back">
        </div>
        <div className="waiting__container">
            <div className="waiting__close" onClick={event => {
                event.preventDefault()
                onClose()
            }}>✖︎</div>
            <img className="waiting__img" src="../img/waiting.gif"></img><h1 className="waiting__title"> Waiting your oponent to join... </h1><img className="waiting__img" src="../img/waiting.gif"></img>
        </div>
    </section>
}