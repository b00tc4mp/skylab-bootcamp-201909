import React from 'react'
import { Link } from 'react-router-dom'

// {favourite => {if(favourite) <img src="img/favourite.png" alt="favourite" />}}

export default function ({ game: {id, title, platform, sell, exchange, favourite, img} }) {

    return <Link to='/mygame' className="game-item__link">
        <img className="game-item__img" src={img} alt="user" />
        <p className="game-item__title">{title}</p>
        <p className="game-item__platform">{platform}</p>
        <span className="game-item__favourite"><img src="img/favourite.png" alt="favourite" /></span>
        <span className="game-item__sell"><img src="img/sell.png" alt="sell" /></span>
        <span className="game-item__exchange"><img src="img/exchange.png" alt="exchange" /></span>
    </Link>
}