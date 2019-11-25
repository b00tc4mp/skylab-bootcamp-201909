import React from 'react'
import { Link } from 'react-router-dom'

export default function ({ username, img }) {
    const { token } = sessionStorage;
    const userLink = token? '/user':'/login';

    return <Link to={userLink} className="user-item__link" ><section className="user-item">
        <img className="user-item__img" src={img} alt="user" />
        <p className="user-item__username">username</p>
    </section>
    </Link>
}