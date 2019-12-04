import React from 'react'
import './index.sass'

export default function () {

    return <section class="select-hand">
        <div class="select-hand__title">SELECT YOUR HAND:</div>
        <div class="select-hand__card-detail">
            <div class="slide-row">◀︎</div>
            <div class ="slide-detail">THIS IS A CARD</div>
            <div class="slide-row">▶︎</div>
        </div>
        <div class="select-hand__selected">
                <div class="card card">1</div><div class="card card">2</div><div class="card card">3</div><div class="card card">4</div><div class="card card">5</div><div class="card card">6</div><div class="card card">7</div><div class="card card">8</div>
        </div>
        <div class="user-game-menu">USER GAME MENU OPTIONS</div>
    </section>
}