import React, { useState, useEffect } from 'react'
import { createGame } from '../../logic'
import { Route, withRouter, Redirect } from 'react-router-dom'

export default withRouter(function ({ history }) {

        const [title, setTitle] = useState('')
        const [platform, setPlatform] = useState('')
        const [sell, setSell] = useState(false)
        const [exchange, setExchange] = useState(false)
        const [favourite, setFavourite] = useState(false)

        async function handleNewGame(title, platform, sell, exchange, favourite) {
                try {
                        console.log('pasa por async')

                        const { token } = sessionStorage

                        console.log(title, platform, sell, exchange, favourite)
                        
                        console.log(token)
                        await createGame(token, title, platform, sell, exchange, favourite)

                        history.push('/myuser')
                        //     await retrieveTasks(token)
                } catch (error) {
                        console.error(error)
                }
        }

        const isDisabled = !title || !platform

        return <section className="game-newedit">
                <form onSubmit={e => {
                        e.preventDefault()

                        console.log('pasa por submit')
                        handleNewGame(title, platform, sell, exchange, favourite)
                        console.log(title, platform, sell, exchange, favourite)
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
                        <p className="game-newedit__sell"><input className="game-newedit__checkbox" type="checkbox" name="sell" value={sell} onChange={event => setSell(event.target.checked? true:false)}/>
                        <img src="img/sell.png" alt="sell" />...to sell</p>
                        <p className="game-newedit__exchange"><input className="game-newedit__checkbox" type="checkbox" name="exchange" value={exchange} onChange={event => setExchange(event.target.checked? true:false)} />
                        <img src="img/exchange.png" alt="exchange" />...to exchange</p>
                        <p className="game-newedit__favourite"><input className="game-newedit__checkbox" type="checkbox" name="favourite" value={favourite} onChange={event => setFavourite(event.target.checked? true:false)} />
                        <img src="img/favourite.png" alt="favourite" />...to mark as favourite</p>
                        <button className="game-newedit__addimg">Add game cover</button>
                        <button className="game-newedit__submit" disabled={isDisabled}>Add</button>
                </form>
        </section>
})