import React from 'react'
import './index.sass'

export default function () {

    return <section class="new-cards">
    <div class="upper-menu">
        <div class="upper-menu__container">
            <div class="upper-menu__item">Coins: 500</div>
        </div>
    </div>
    <div class="new-cards__title">TODAY, YOU CAN CHOOSE BETWEEN THIS CARDS:</div>
    <div class="new-cards__random random">
            <div class ="random__card"><img className="random__card" src="img/attack.png"></img></div>
            <div class ="random__card"><img className="random__card" src="img/defend.png"></img></div>
            <div class ="random__card"><img className="random__card" src="img/block.png"></img></div>
    </div>
    <div class="user-game-menu">USER GAME MENU OPTIONS</div>
</section>
}