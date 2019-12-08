import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router'
import './index.sass'
import { retrieveGame, retrieveUser } from '../../logic'
import Context from '../Context'
import GameZone from '../GameZone'
import Card from '../Card'

export default function ({ history }) {

    const { feed, setFeed } = useContext(Context)

    const [currentPlayer, setCurrentPlayer] = useState()
    const [enemy, setEnemy] = useState()
    const [game, setGame] = useState()
    const [user, setUser] = useState()
    const [render, setRender] = useState(false)
    const [turnChange, setTurnChange] = useState(0)

    let refresher

    const { gameId } = useParams()
    const { token } = sessionStorage

    useEffect(() => {
        if (typeof refresher !== 'number') {
            refresher = setInterval(() => {
                (async () => {
                    try {      
                        const user = await retrieveUser(token)
                        setUser(user)      
                        const _game = await retrieveGame(gameId, token)
                        let current = _game.players.findIndex(player => player.user.id === user.id)
                        setCurrentPlayer(current)
                        setEnemy((current + 1) % 2)
                        setGame(_game)
                    } catch ({ message }) {
                        debugger
                        delete sessionStorage.gameId
                        clearInterval(refresher)
                        setFeed({ title: "🦖 There was an error:", message })
                        history.push('/')
                    }
                })()
            }, 5000)
        }
        return () => {
            clearInterval(refresher)
        }
    }, [setGame])

    return <section className="game-panel">
        {game && <>
            <div className="cards-zone">
                {game.players[enemy].hand.map((card, i) => <div key={i} className="card"><img className="card" src="img/backcard.png"></img></div>)}
            </div>
            <div className="life">{game.players[enemy].user.nickname}</div>
            <GameZone gameZone={game.shoots}/>
            <div className="temp-zone">
                {game.players[enemy].tempZone.length > 0 ? <img className="card card--played" src={`img/${game.players[enemy].tempZone.image}`}></img> : "TEMP ZONE"}
            </div>
            <div className="discards">
                {game.players[enemy].discards.length > 0 ? <img className="card card--played" src="img/backcard.png"></img> : "DISCARDS"}
            </div>
            {/*++++++++++++++++ ⬆️ENEMY_ZONE   VS   PLAYER_ZONE⬇️  +++++++++++++++++*/}
            <div className="temp-zone">
                {game.players[currentPlayer].tempZone.length > 0 ? <img className="card card--played" src={`img/${game.players[currentPlayer].tempZone.image}`}></img> : "TEMP ZONE"}
            </div>
            <div className="discards">
                {game.players[currentPlayer].discards.length > 0 ? <img className="card card--played" src="img/backcard.png"></img> : "DISCARDS"}
            </div>
            <div className="cards-zone">
                {game.players[currentPlayer].hand.map((card,i) => <div key={i} className="card"> <Card className={"card"} src={`img/${card.image}`} card={card} /> </div>)}
            </div>
            <div className="life">{game.players[currentPlayer].user.nickname}</div>
            <div className="user-game-menu">USER GAME MENU OPTIONS</div></>}
    </section>
}