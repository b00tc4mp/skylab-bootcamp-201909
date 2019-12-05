import React from 'react'
import './index.sass'

export default function ({ games, onJoin, onClose}) {
    return <section className="game">
        <div className="game__back">
        </div>
        <div className="game__container">
            <div className="game__close" onClick={event => {
                event.preventDefault()
                onClose()
            }}>✖︎</div>
            <h1 className="game__title">🎮 Theese are the avaiable games:</h1>
            <ul className="game__list">
                {games.map(game => <li className="game__list-item" key={game.id} onClick={event => {
                    event.preventDefault()
                    event.stopPropagation()
                    onJoin(game.id)
                }
                }> 🤖 >> {game.nickname}</li>)}
            </ul>
        </div>
    </section>
}