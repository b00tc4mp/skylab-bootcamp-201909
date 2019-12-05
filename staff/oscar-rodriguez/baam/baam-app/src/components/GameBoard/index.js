import React from 'react'
import './index.sass'

export default function () {

    return <section className="game-panel">
        <div className="cards-zone">
            <div className="card card--oponent"><img className="card" src="img/backcard.png"></img></div>
            <div className="card card--oponent"><img className="card" src="img/backcard.png"></img></div>
            <div className="card card--oponent"><img className="card" src="img/backcard.png"></img></div>
            <div className="card card--oponent"><img className="card" src="img/backcard.png"></img></div>
            <div className="card card--oponent"></div>
        </div>
        <div className="life">LIFE</div>
        <div className="game-zone">GAME ZONE</div>
        <div className="temp-zone">
            <img className="card card--played" src="img/block.png"></img>
        </div>
        <div className="discards">
            
        </div>
        <div className="temp-zone">TEMP ZONE</div>
        <div className="discards">
        <img className="card card--played" src="img/backcard.png"></img>
        </div>
        <div className="cards-zone">
            <div className="card card"><img className="card" src="img/attack.png"></img></div>
            <div className="card card"><img className="card" src="img/block.png"></img></div>
            <div className="card card"><img className="card" src="img/defend.png"></img></div>
            <div className="card card"><img className="card" src="img/attack.png"></img></div>
            <div className="card card"><img className="card" src="img/heal.png"></img></div>
        </div>
        <div className="life">LIFE</div>
        <div className="user-game-menu">USER GAME MENU OPTIONS</div>
    </section>
}