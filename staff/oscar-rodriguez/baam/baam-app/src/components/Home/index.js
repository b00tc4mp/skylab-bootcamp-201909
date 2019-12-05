import React from 'react'
import './index.sass'

export default function ({user, onLogout, onShowCards, onGetNewCards, onStartGame}) {

    return <section className="home">
        {user &&
            <div className="upper-menu">
                <div className="upper-menu__container">
                    <div className="upper-menu__item">wins: {user.stats.wins}</div>
                    <div className="upper-menu__item">ties: {user.stats.ties}</div>
                    <div className="upper-menu__item">loses: {user.stats.loses}</div>
                </div>
                <div className="upper-menu__container">
                <div className="upper-menu__item">💰: {user.coins}</div>
                </div>
                <div className="upper-menu__container">
                    <div className="upper-menu__item">Hello {user.nickname}</div>
                    <a href="#" className="upper-menu__item" onClick={ event => onLogout()}>Log out</a>
                </div>
            </div>
        }
            <section className="home__option" onClick={event => onShowCards()}>
                <div class="card-front"></div>
                <div class="card-back">
                    <h2>Your cards</h2>
                </div>
            </section>
            <section className="home__option" onClick={event => onGetNewCards()}>
                <div class="card-front"></div>
                <div class="card-back">
                    <h2>Get new cards</h2>
                </div>   
            </section>
            <section className="home__option" onClick={event => onStartGame()}>
                <div class="card-front"></div>
                <div class="card-back">
                    <h2>Start new GAME</h2>
                </div>
            </section>
            <div className="home__side">
                <section className="home__option home__option--small">
                    Rewards
                </section>
                <section className="home__option home__option--small">
                    Ranking
                </section>
                <section className="home__option home__option--small">
                    Invite Friends
                </section>
                <section className="home__option home__option--small">
                    The collections
                </section>
            </div>
            <div className="home__footer home-footer">
                <span className="home__footer home-footer__item">About Baam!!</span> - 
                <span className="home__footer home-footer__item">Report a bug</span> - 
                <span className="home__footer home-footer__item">Contact Us</span> - 
                <span className="home__footer home-footer__item">Make your Card suggeriments</span>
            </div>
        </section>
}