import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { retrieveGame } from '../../logic'

export default withRouter(function ({ history }) {

    // const gameId = id//gameLink//.toString().substr(8)
    
    // const [gameId, setId] = useState()
    const [title, setTitle] = useState()
    const [platform, setPlatform] = useState()

    const { location: {pathname} } = history
    const gameId = pathname.substr(8)

    useEffect(() => {
        const { token } = sessionStorage;
        
        (async () => {
            if (token) {
                const { title, platform } = await retrieveGame(token, gameId)
                
                // setId(gameId)
                setTitle(title)
                setPlatform(platform)

            }
        })()
    }, [sessionStorage.token])

    return <section className="game-detail">
        <h1 className="game-detail__title">{title}</h1>
        <section className="game-detail__item">
            <img className="game-detail__img" src="img/dummy-game.png" alt="user" />
            <p className="game-detail__platform">{platform}</p>
            <p className="game-detail__favourite"><img src="img/favourite.png" alt="favourite" /> my favourite</p>
            <p className="game-detail__sell"><img src="img/sell.png" alt="sell" /> i wanna sell</p>
            <p className="game-detail__exchange"><img src="img/exchange.png" alt="exchange" /> i wanna exchange</p>
            <Link to='/updategame'>
                <button className="game-detail__edit">Edit game info</button>
            </Link>
            <button className="game-detail__remove">Remove game</button>
            <h1 className="game-detail__title">Chat if you are interested!</h1>
            <span className="game-detail__chat">chat content</span>
        </section>
    </section>
})