import React from 'react'
import './index.sass'


export default function ({ ad: { id, title, description, price, name }, adDetail }) {
    return <section class='detailAd'>
        <img class="detailAd__image" src="https://dummyimage.com/260x190/949494/1f1f1f"/>
        <div class="detailAd__pf">
            <span class="detailAd__price">{price}€</span>
            <span class="detailAd__fav">
                <form class="detailAd_fav-form" method="post" action="">
                    <input type="hidden" name="id"/>
                    <button class="detailAd__fav-submit" type="submit"><i class="far fa-heart"></i></button>
                </form>
            </span>
        </div>
        <h2 class="detailAd__title">{title}</h2>
        <p class="detailAd__descr">{description}</p>

        <p class="detailAd__user">{name}</p>
        <form class="chat__form">
            <input type="hidden" name="id"/>
            <button class="chat__button">Chat</button>
        </form>
    </section>    
}