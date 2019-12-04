import React from 'react'
import './index.sass'

export default function () {
    return <section class="your-cards">
    <div class="upper-menu">
        <div class="upper-menu__container">
            <div class="upper-menu__item">Get New Cards!</div>
        </div>
    </div>
    <div class="your-cards__title">YOUR CARDS:</div>
    <div class="your-cards__card-detail">
            <div class="slide-row">◀︎</div>
            <div class ="slide-detail"><img className="slide-detail" src="img/attack.png"></img></div>
            <div class ="slide-detail"><img className="slide-detail" src="img/defend.png"></img></div>
            <div class ="slide-detail"><img className="slide-detail" src="img/heal.png"></img></div>
            <div class ="slide-detail"><img className="slide-detail" src="img/block.png"></img></div>
            <div class="slide-row">▶︎</div>
        </div>
</section>
}