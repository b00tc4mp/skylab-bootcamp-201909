import React, { useState } from 'react'
import { modifyGame } from '../../logic'
import { withRouter } from 'react-router-dom'

export default withRouter(function ({ history }) {

        const { location: { pathname } } = history
        const gameId = pathname.substr(12)

        const [title, setTitle] = useState('')
        const [platform, setPlatform] = useState('')
        const [sell, setSell] = useState(false)
        const [exchange, setExchange] = useState(false)
        const [favourite, setFavourite] = useState(false)

        async function handleUpdateGame(title, platform, sell, exchange, favourite) {
                try {
                        const { token } = sessionStorage

                        await modifyGame(token, gameId, title, platform, sell, exchange, favourite)

                        history.push('/myuser')

                } catch (error) {
                        console.error(error)
                }
        }

        const isDisabled = !title || !platform

        return <section className="game-newedit">
                <form onSubmit={e => {
                        e.preventDefault()

                        handleUpdateGame(title, platform, sell, exchange, favourite)
                        setTitle('')
                        setPlatform('')
                        setSell()
                        setExchange()
                        setFavourite()

                }}>
                        <h1 className="game-newedit__title">Edit game info</h1>
                        <input className="game-newedit__field" type="text" name="title" placeholder="game title" onChange={event => setTitle(event.target.value)} />
                        <input className="game-newedit__field" type="text" name="platform" placeholder="platform (ps4, xbox...)" onChange={event => setPlatform(event.target.value)} />
                        <p className="game-newedit__subtitle">Pick if you want...</p>
                        <p className="game-newedit__sell"><input className="game-newedit__checkbox" type="checkbox" name="sell" value={sell} onChange={event => setSell(event.target.checked ? true : false)} />
                                <img src="img/sell.png" alt="sell" />...to sell</p>
                        <p className="game-newedit__exchange"><input className="game-newedit__checkbox" type="checkbox" name="exchange" value={exchange} onChange={event => setExchange(event.target.checked ? true : false)} />
                                <img src="img/exchange.png" alt="exchange" />...to exchange</p>
                        <p className="game-newedit__favourite"><input className="game-newedit__checkbox" type="checkbox" name="favourite" value={favourite} onChange={event => setFavourite(event.target.checked ? true : false)} />
                                <img src="img/favourite.png" alt="favourite" />...to mark as favourite</p>
                        <button className="game-newedit__submit" disabled={isDisabled}>Update info</button>
                </form>
        </section>
})