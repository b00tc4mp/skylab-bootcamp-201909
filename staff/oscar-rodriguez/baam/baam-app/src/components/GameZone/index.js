import React from 'react'
import './index.sass'

export default function ({gameZone}) {

    return <div className="game-zone">
        {gameZone.length > 0 ? <img className="card card--played" src={`img/${gameZone[gameZone.length-1].image}`}></img> : "GAME ZONE"}</div>
}