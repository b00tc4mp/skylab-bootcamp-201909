import React from 'react'
import UserList from '../UserList'

export default function({  }) {
    const { token } = sessionStorage;

    const isToken = token? <UserList /> : <h1 className="user-list__title">Welcome to the place where the gamers unite</h1>

    return <>
    {isToken}
    </>
}