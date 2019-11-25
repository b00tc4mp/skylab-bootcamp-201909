import React from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import GameList from '../GameList'

export default withRouter(function ({ history }) {

    return <section className="user-profile">
        <h1 className="user-profile__title">username</h1>
        <section className="user-profile__item">
            <img className="user-profile__img" src="img/dummy-user.png" alt="user" />
            <p className="user-profile__location">user's location</p>
            <p className="user-profile__email">user's email</p>
            <p className="user-profile__numofgames">XX games</p>
        </section>
        <h1 className="user-profile__title">Game collection</h1>
        <GameList />
    </section>
})