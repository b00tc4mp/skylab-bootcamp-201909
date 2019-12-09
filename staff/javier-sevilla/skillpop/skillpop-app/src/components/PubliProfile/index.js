import React from 'react'
import './index.sass'
import MyAds from '../MyAds'

export default function ({ ads, user: {id, name}, adDetail }) {
    return <section class='publiProfile'>
            <div class="publiProfile__head">
                <img className="item__image" src={`${API_URL}/user/load/${id}?timestamp=${Date.now()}`}/>
                <h3 class="publiProfile__user">{name}</h3>
            </div>
            <h2 class="publiProfile__titlead">ADS</h2>
            <ul className="results">
                {ads && ads.map(ad => <li className="results__item" key={ad.id}><AdItem ad={ad} adDetail={adDetail} /></li>)}
            </ul>
            <div class="comments">
            <h2 class="comments__title">Comments:</h2>
            <form class="comments__form">
                <textarea class="comments__textarea">Add you comment</textarea>
                <input type="hidden" name="id">
                <button class="comments__submit"><i class="fas fa-arrow-circle-right"></i></button>
            </form>
    </section>
             
}