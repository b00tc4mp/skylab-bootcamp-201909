import React from 'react'
import { Link } from 'react-router-dom'

export default function ({ user: {id, username, img} }) {
    const { token } = sessionStorage;
    const userLink = token? '/user':'/login';
    console.log(username)

    return <Link to={userLink} className="user-item__link" >
        <img className="user-item__img" src={img} alt="user" />
        <p className="user-item__username">{username}</p>
    </Link>
}