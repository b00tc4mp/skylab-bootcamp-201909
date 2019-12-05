import React from 'react'
import './index.sass'
const API_URL = process.env.REACT_APP_API_URL

export default function ({ wish : {id, title, price, link, description}, user }){
    return <>
    <div className="mywishes__detail">
        <img className="mywishes__wimage" src={`${API_URL}/wishes/${user.id}/wish/${id}`}/>
        <span className="mywishes__price">{price} €</span>
    </div>
    <div className="mywishes__info">
        <span className="mywishes__wname"> {title} </span>
        <p className="mywishes__wdescription">{description}</p>
        <a className="mywishes__link" href={link} > Online Store </a>
    </div>
    <div className="mywishes__buttonscontainer">
        <button className="mywishes__button">Edit</button>
        <button className="mywishes__button">Remove</button>
        <button className="mywishes__button">Given</button>
    </div>
</>
}