import React, { useState, useEffect } from 'react'
import { listMyGames } from '../../logic'
import MyGameItem from '../MyGameItem'

export default function ({  }) {

    const [games, setGames] = useState([])

    useEffect(() => {
        const { token } = sessionStorage;

        (async () => {
            if (token) {

                await retrieveGames(token)
            }
        })()
    }, [sessionStorage.token])

    async function retrieveGames(token) {
        const games = await listMyGames(token)

        setGames(games)
    }

    return <><p className="user-profile__numofgames">{games.length} games</p>
    <section className="game-list">
        {games.map(game => <section className="game-item" key={game.id}><MyGameItem game={game}/></section>)}
    </section></>
}