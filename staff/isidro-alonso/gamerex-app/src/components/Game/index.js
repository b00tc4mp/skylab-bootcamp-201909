import React from 'react'
import { Link } from 'react-router-dom'

export default function ({ }) {

    return <section className="game-detail">
        <h1 className="game-detail__title">Game title</h1>
        <section className="game-detail__item">
            <img className="game-detail__img" src="img/dummy-game.png" alt="user" />
            <p className="game-detail__platform">platform</p>
            <p className="game-detail__favourite"><img src="img/favourite.png" alt="favourite" /> favourite</p>
            <p className="game-detail__sell"><img src="img/sell.png" alt="sell" /> i wanna sell</p>
            <p className="game-detail__exchange"><img src="img/exchange.png" alt="exchange" /> i wanna exchange</p>
            <h1 className="game-detail__title">Chat if you are interested!</h1>
            <span className="game-detail__chat">chat content</span>
        </section>
    </section>
}