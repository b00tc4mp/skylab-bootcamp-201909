import React from 'react'
import { Link } from 'react-router-dom'

export default function() {
    const { token } = sessionStorage;
    const userLink = token? '/myuser':'/login';

    return <header className="header">
        <Link to='/'>
            <button className="header__logo"><img src="./img/logo.png" alt="gamerex" /></button>
        </Link>
        <span className="header__container">
        <button className="header__search"><img src="./img/search.png" alt="search" /></button>
        <Link to={userLink}>
            <button className="header__user">
                <img src="./img/user.png" alt="user" />
            </button>
        </Link>
    
        
    </span>
    </header>
    
}