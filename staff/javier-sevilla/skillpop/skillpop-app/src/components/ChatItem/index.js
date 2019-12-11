import React from 'react'
import './index.sass'
const API_URL = process.env.REACT_APP_API_URL


export default function ({ chat: {users}, user: {id, name}, onDeleteChat}) {
    return <><a href="#" className="itemchat">
                <img className="itemchat__image" src="https://dummyimage.com/120x130/949494/1f1f1f"/>
                <h2 className="itemchat__user">userName Surname</h2>
             </a>
             <form className="itemchat__form" onSubmit={function (event) {
                event.preventDefault()

                onDeleteChat()
             }}>
                <input type="hidden" name="id"/>
                <button className="itemchat__delete">Delete</button>
             </form></>
}