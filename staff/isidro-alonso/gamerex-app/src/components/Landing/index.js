import React from 'react'
import UserList from '../UserList'

export default function({  }) {
    const { token } = sessionStorage;

    const isToken = token? <UserList /> : <><section className="intro"><img className="intro__img" src="img/intro.png" /></section><section className="intro"><h1 className="intro__title">Welcome to the place where the gamers unite</h1></section></>

    return <>
    {isToken}
    </>
}