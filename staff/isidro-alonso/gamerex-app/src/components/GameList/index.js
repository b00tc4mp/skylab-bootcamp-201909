import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { listGames } from '../../logic'
import GameItem from '../GameItem'

export default withRouter(function ({ history }) {

    const [games, setGames] = useState([])

    const { location: { pathname } } = history
    const userId = pathname.substr(10)

    useEffect(() => {
        const { token } = sessionStorage;

        (async () => {
            if (token) {
                const gameList = await listGames(token)

                let filteredList = []
                for (let i = 0; i < gameList.length; i++) {
                    if (userId === gameList[i].user) {
                        filteredList.push(gameList[i])
                    }
                }

                setGames(filteredList)
            }
        })()
    }, [sessionStorage.token])

    return <><p className="user-profile__numofgames">{games.length} games</p>
        <section className="game-list">
            {games.map(game => <section className="game-item" key={game.id}><GameItem game={game} /></section>)}
        </section></>
})