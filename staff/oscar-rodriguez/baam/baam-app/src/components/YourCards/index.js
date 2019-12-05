import React, { useState, useEffect } from 'react'
import './index.sass'
import { retrieveUserCards } from '../../logic'

export default function ({ onLogout, onGetNewCards, user, onHome }) {
    const [cards, setCards] = useState()
    const [error, setError] = useState()


    useEffect(() => {
        const { token } = sessionStorage;

        (async () => {
            if (token) {
                try {
                    debugger
                    let cards = await retrieveUserCards(token)
                    cards = cards.concat(cards)
                    setCards(cards)

                    debugger
                } catch (error) {
                    setError(error)
                    debugger
                }
            }
        })()
    }, [sessionStorage.token])

    return <section class="your-cards">
        <div class="upper-menu">
            <div class="upper-menu__container">
                <a class="upper-menu__item" href="#" onClick={event => {
                    event.preventDefault()
                    onGetNewCards()
                }}><div>Get New Cards!</div></a>
            </div>
            {user && <div className="upper-menu__container">
                <div className="upper-menu__item">Hello {user.nickname}</div>
                <a href="#" className="upper-menu__item" onClick={event => { event.preventDefault(); onLogout() }}>Log out</a>
                <a href="#" className="upper-menu__item" onClick={event => { event.preventDefault(); onHome() }}>✪</a>
            </div>}
        </div>
        <div class="your-cards__title">YOUR CARDS:</div>
        <div class="your-cards__container">
            <div class="your-cards__card-list">
                {cards && cards.map(card =>
                    <div class="your-cards__card-detail">
                        <img class="your-cards__card-front" src={`img/${card.image}`}></img>
                        <div class="your-cards__card-back"> {`Name: ${card.name}`}</div>
                    </div>)}
            </div>
        </div>
    </section>
}