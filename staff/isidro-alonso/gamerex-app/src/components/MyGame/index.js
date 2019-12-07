import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { retrieveGame, removeGame } from '../../logic'
const API_URL = process.env.REACT_APP_API_URL

export default withRouter(function ({ history }) {

    const [title, setTitle] = useState()
    const [platform, setPlatform] = useState()
    const [favourite, setFavourite] = useState()
    const [sell, setSell] = useState()
    const [exchange, setExchange] = useState()

    function showFav() {
        if (favourite) return <p className="game-detail__favourite"><img src="img/favourite.png" alt="favourite" /> My favourite</p>
    }

    function showSell() {
        if (sell) return <p className="game-detail__sell"><img src="img/sell.png" alt="sell" /> I wanna sell</p>
    }

    function showExch() {
        if (exchange) return <p className="game-detail__exchange"><img src="img/exchange.png" alt="exchange" /> I wanna exchange</p>
    }

    const { location: { pathname } } = history
    const gameId = pathname.substr(8)

    useEffect(() => {
        const { token } = sessionStorage;

        (async () => {
            if (token) {
                const { title, platform, favourite, sell, exchange } = await retrieveGame(token, gameId)

                setTitle(title)
                setPlatform(platform)
                setFavourite(favourite)
                setSell(sell)
                setExchange(exchange)

            }
        })()
    }, [sessionStorage.token])

    const handleRemoveGame = async (e) => {
        e.preventDefault()
        const { token } = sessionStorage;
        if (token) {
            try {
                await removeGame(token, gameId)
                history.push('/myuser')

            } catch (error) {
                console.error(error)
            }
        }
    }

    const updateGameLink = `/updategame/${gameId}`

    const updateGameImgLink = `/updateimggame/${gameId}`

    const image = `${API_URL}/games/load/${gameId}?timestamp=${Date.now()}`

    return <section className="game-detail">
        <h1 className="game-detail__title">{title}</h1>
        <section className="game-detail__item">
            <Link to={updateGameImgLink}>
                <img className="game-detail__img" src={image} alt="game" />
            </Link>
            <p className="game-detail__platform">{platform}</p>
            {showFav()}
            {showSell()}
            {showExch()}
            <Link to={updateGameLink}>
                <button className="game-detail__edit">Edit game info</button>
            </Link>
            <Link to={updateGameImgLink}>
                <button className="game-detail__edit">Edit game image</button>
            </Link>
            <button className="game-detail__remove" onClick={handleRemoveGame}>Remove game</button>
            <h1 className="game-detail__title">Chat if you are interested!</h1>
            <span className="game-detail__chat">chat content</span>
        </section>
    </section>
})