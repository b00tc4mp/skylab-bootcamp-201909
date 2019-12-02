import React, { useState, useEffect } from 'react'
import { listGames } from '../../logic'
import './index.sass'
import GameItem from '../GameItem'

export default function () {

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

    return <><p className="user-profile__numofgames">{games.length} games</p>
        <section className="game-list">
            {games.map(game => <section className="game-item" key={game.id}><GameItem game={game} /></section>)}
        </section></>
}