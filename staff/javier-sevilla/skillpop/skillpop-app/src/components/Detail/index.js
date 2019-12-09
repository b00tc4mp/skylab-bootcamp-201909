import React from 'react'
import './index.sass'
const API_URL = process.env.REACT_APP_API_URL


export default function ({ ad: { id, title, description, price, name }, adDetail }) {
    return <section className='detailAd'>
        <img className="item__image" src={`${API_URL}/ads/load/${id}?timestamp=${Date.now()}`}/>
        <div className="detailAd__pf">
            <span className="detailAd__price">{price}€</span>
            <span className="detailAd__fav">
                <form className="detailAd_fav-form" method="post" action="">
                    <input type="hidden" name="id"/>
                    <button className="detailAd__fav-submit" type="submit"><i className="far fa-heart"></i></button>
                </form>
            </span>
        </div>
        <h2 className="detailAd__title">{title}</h2>
        <p className="detailAd__descr">{description}</p>

        <p className="detailAd__user">{name}</p>
        <form className="chat__form">
            <input type="hidden" name="id"/>
            <button className="chat__button">Chat</button>
        </form>
    </section>    
}