import React from 'react'
import './index.sass'

export default function({onLogout, onLanding}){
    return <header className="header">
    <section className="header__section1">
        <a href="/" className="header__title" onClick={event => { event.preventDefault(); onLanding() }}>WiShare</a>
    </section>
    <section className="header__section2">
        <input type="checkbox" id="show-menu"/>
        <label className="header__hamburguer" htmlFor="show-menu"><img className="header__hamburguericon"
                src="https://cdn4.iconfinder.com/data/icons/wirecons-free-vector-icons/32/menu-alt-512.png"/></label>
        <nav className="header__nav menu">
            <ul className="menu__list list">
                <li><a href="#" className="list__item">My Wishes</a></li>
                <li><a href="#" className="list__item">Friends</a></li>
                <li><a href="#" className="list__item">Saved Wishes</a></li>
                <li><a href="#" className="list__item">My account</a></li>
                <li><a href="/" className="list__item" onClick={event => { event.preventDefault(); onLogout() }}>Logout</a></li>
            </ul>
        </nav>
    </section>
</header>
}