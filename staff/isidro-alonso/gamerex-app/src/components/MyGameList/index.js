import React, { useState, useEffect } from 'react'
import { listGames } from '../../logic'
import './index.sass'
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
        const games = await listGames(token)

        setGames(games)
    }

    return <section className="game-list">
        {games.map(game => <section className="game-item" key={game.id}><MyGameItem game={game} /></section>)}
    </section>
}