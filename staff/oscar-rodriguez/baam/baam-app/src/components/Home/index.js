import React from 'react'
import './index.sass'

export default function () {

    return <section class="home">
            <div class="upper-menu">
                <div class="upper-menu__container">
                    <div class="upper-menu__item">wins: 5</div>
                    <div class="upper-menu__item">ties: 2</div>
                    <div class="upper-menu__item">loses: 3</div>
                </div>
                <div class="upper-menu__container">
                    <div class="upper-menu__item">username</div>
                </div>
            </div>
            <section class="home__option">
                Your cards
            </section>
            <section class="home__option">
                Get new cards
            </section>
            <section class="home__option">
                New game
            </section>
            <div class="home__side">
                <section class="home__option home__option--small">
                    Rewards
                </section>
                <section class="home__option home__option--small">
                    Ranking
                </section>
                <section class="home__option home__option--small">
                    Invite Friends
                </section>
                <section class="home__option home__option--small">
                    The collections
                </section>
            </div>
            <div class="home__footer home-footer">
                <span class="home__footer home-footer__item">About Baam!!</span> - 
                <span class="home__footer home-footer__item">Report a bug</span> - 
                <span class="home__footer home-footer__item">Contact Us</span> - 
                <span class="home__footer home-footer__item">Make your Card suggeriments</span>
            </div>
        </section>
}