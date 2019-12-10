import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { retrieveGame, removeGame, addComment } from '../../logic'
import Feedback from '../Feedback'
const API_URL = process.env.REACT_APP_API_URL

export default withRouter(function ({ history }) {

    const [title, setTitle] = useState()
    const [platform, setPlatform] = useState()
    const [favourite, setFavourite] = useState()
    const [sell, setSell] = useState()
    const [exchange, setExchange] = useState()

    const [body, setBody] = useState()

    const [error, setError] = useState('')

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
                setError(error.message.toString())
            }
        }
    }

    async function handleNewComment(body) {
        const { token } = sessionStorage;
        if (token) {
            try {
                await addComment(token, gameId, body)

            } catch (error) {
                setError(error.message.toString())
            }
        }
    }

    const updateGameLink = `/updategame/${gameId}`

    const updateGameImgLink = `/updateimggame/${gameId}`

    const image = `${API_URL}/games/load/${gameId}?timestamp=${Date.now()}`

    return <section className="game-detail">
        {error && <Feedback message={error} />}
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
            <h1 className="game-detail__title">Comment if you are interested!</h1>
            <span className="game-detail__chat">
                <form id="commentform" onSubmit={e => {
                    e.preventDefault()

                    handleNewComment(body)

                    setBody('')
                }}>
                    <textarea className="chat__textcomment" rows="5" cols="30" name="comment" form="commentform" value={body} placeholder="Leave your comment here..." onChange={event => setBody(event.target.value)}></textarea>
                    <button className="chat__send">Send comment</button>
                </form>
            </span>
        </section>
    </section>
})