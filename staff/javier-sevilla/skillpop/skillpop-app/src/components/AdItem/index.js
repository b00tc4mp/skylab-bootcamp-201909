import React from 'react'
import './index.sass'
const API_URL = process.env.REACT_APP_API_URL

export default function ({ ad: { id, title, price }, adDetail }) {
    return <a href="#" className="item" onClick={event => {
            event.preventDefault()

            adDetail(id)
        }}>
            {/* <img className="item__image" src={`${API_URL}/ads/${user.id}/wish/${id}?timestamp=${Date.now()}`}/> */}
            <img className="item__image" src="https://dummyimage.com/120x130/949494/1f1f1f"/>
            <div className="item__pf">
                <span className="item__price">{price}€</span>
                <span className="item__fav">
                    <form className="item__fav-form" method="post" action="">
                        <input type="hidden" name="id"/>
                        <button className="item__fav-submit" type="submit"><i className="far fa-heart"></i></button>
                    </form>
                </span>
            </div>
            <h2 className="item__title">{title}</h2>
        </a>
}