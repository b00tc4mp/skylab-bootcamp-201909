import React from 'react'

import './index.sass'

export default function({ currentUser , onLogout }){
    return( <header className='header-wrapper'>
                <h1 className="header__h1">Todo App</h1>
                {currentUser && <h2 className="header__username">{currentUser.user.username}</h2>}
                {currentUser && <button className="btn--logout" onClick={onLogout}></button>}

            </header>)
}