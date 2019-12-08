import React, { useState, useEffect } from 'react'
import { createGame, listGames } from '../../logic'
import { withRouter } from 'react-router-dom'
import Feedback from '../Feedback'

export default withRouter(function ({ history }) {

        const [title, setTitle] = useState('')
        const [platform, setPlatform] = useState('')
        const [sell, setSell] = useState(false)
        const [exchange, setExchange] = useState(false)
        const [favourite, setFavourite] = useState(false)

        const [games, setGames] = useState([])

        const [error, setError] = useState('')

        async function handleNewGame(title, platform, sell, exchange, favourite) {
                try {

                        const { token } = sessionStorage

                        await createGame(token, title, platform, sell, exchange, favourite)

                        history.push('/myuser')

                } catch (error) {
                        setError(error.message.toString())
                }
        }

        useEffect(() => {
                const { token } = sessionStorage;
        
                (async () => {
                    if (token) {

                        const games = await listGames(token)

                        setGames(games)
        
                        await retrieveGames(token)
                    }
                })()
            }, [sessionStorage.token])

        async function retrieveGames(token) {
                const games = await listGames(token)

                setGames(games)
        }

        const isDisabled = !title || !platform

        return <section className="game-newedit">
                {error && <Feedback message={error} />}
                <form onSubmit={e => {
                        e.preventDefault()

                        handleNewGame(title, platform, sell, exchange, favourite)
                        setTitle('')
                        setPlatform('')
                        setSell()
                        setExchange()
                        setFavourite()
                }}>
                        <h1 className="game-newedit__title">Add new game</h1>
                        <input className="game-newedit__field" type="text" name="title" value={title} placeholder="game title" onChange={event => setTitle(event.target.value)} />
                        <input className="game-newedit__field" type="text" name="platform" value={platform} placeholder="platform (ps4, xbox...)" onChange={event => setPlatform(event.target.value)} />
                        <p className="game-newedit__subtitle">Pick if you want...</p>
                        <p className="game-newedit__sell"><input className="game-newedit__checkbox" type="checkbox" name="sell" value={sell} onChange={event => setSell(event.target.checked ? true : false)} />
                                <img src="img/sell.png" alt="sell" />...to sell</p>
                        <p className="game-newedit__exchange"><input className="game-newedit__checkbox" type="checkbox" name="exchange" value={exchange} onChange={event => setExchange(event.target.checked ? true : false)} />
                                <img src="img/exchange.png" alt="exchange" />...to exchange</p>
                        <p className="game-newedit__favourite"><input className="game-newedit__checkbox" type="checkbox" name="favourite" value={favourite} onChange={event => setFavourite(event.target.checked ? true : false)} />
                                <img src="img/favourite.png" alt="favourite" />...to mark as favourite</p>
                        {/* <p className="game-newedit__subtitle">Add game image</p><input type="file" name="filetoupload" className="game-newedit__addimg" /> */}
                        <button className="game-newedit__submit" disabled={isDisabled}>Add game</button>
                </form>
        </section>
})