import React from 'react'
import { Link } from 'react-router-dom'

export default function ({ game: {_id: id, title, platform, sell, exchange, favourite, img} }) {

    function showFav() {
        if(favourite) return <img src="img/favourite.png" alt="favourite" />
    }

    function showSell() {
        if(sell) return <img src="img/sell.png" alt="sell" />
    }

    function showExch() {
        if(exchange) return <img src="img/exchange.png" alt="exchange" />
    }

    const userGameLink = `/usergame/${id}`

    return <Link to={userGameLink} className="game-item__link">
        <section className="game-item">
            <img className="game-item__img" src={img} alt="game" />
            <p className="game-item__title">{title}</p>
            <p className="game-item__platform">{platform}</p>
            <span className="game-item__favourite">{showFav()}</span>
            <span className="game-item__sell">{showSell()}</span>
            <span className="game-item__exchange">{showExch()}</span>
        </section>
    </Link>
}