import React, { useEffect, useState } from 'react'
import './index.sass'
import { retrieveFriend } from '../../logic'
const API_URL = process.env.REACT_APP_API_URL

export default function ({ id }) {
    const [friend, setFriend] = useState({})
    const [friendId, setFriendId] = useState()

    useEffect(() => {
        const { token } = sessionStorage;
        if (token) {
            (async () => {

                const friend = await retrieveFriend(token, id)

                setFriend(friend)

                const friendId = id

                setFriendId(friendId)

            })()
        }
    }, [sessionStorage.token ])

    const { name, surname, email, birthday, description, wishes } = friend
    console.log(wishes)
    return <section className="friend-detail hidden">
        <section className="friend-detail__container">
            <button className="friend-detail__back"> Back </button>
        </section>

        <section className="friend-detail__user">
            <h2 className="friend-detail__name">{name} {surname}</h2>
            <img className="friend-detail__image" src={`${API_URL}/users/profileimage/${friendId}?timestamp=${Date.now()}`} alt="profile picture" />
            <span className="friend-detail__email"> {email}</span>
            <span className="friend-detail__bday"> B-day:{birthday}</span>
            <p className="friend-detail__description"> {description}</p>
        </section>

        <section className="friend-detail__wishes">
            <h2 className="friend-detail__title">{name}'s Wishes</h2>
            <ul className="friend-detail__list"> 
                {!wishes && <p classNameName="mywishes__nowish"> {name} has no wishes added</p>}
                {wishes && wishes.map(wish => <li className="friend-detail__wish" key={wish.id}>
                    <div className="friend-detail__detail">
                        <img className="friend-detail__wimage" src={`${API_URL}/wishes/${friendId}/wish/${wish.id.toString()}?timestamp=${Date.now()}`} />
                        <span className="friend-detail__price">{wish.price} €</span>
                    </div>
                    <div className="friend-detail__info">
                        <span className="friend-detail__wname"> {wish.title} </span>
                        <p className="friend-detail__wdescription">{wish.description}</p>
                        {!wish.given && <a classNameName="friend-detail__link" href={wish.link} > Online Store </a>}
                        {wish.given && <p classNameName="friend-detail__given"> GIVEN GIFT!! </p>}
                    </div>
                    <div className="friend-detail__btn">
                        <button className="friend-detail__save">Save wish</button>
                        <button className="friend-detail__save">Block wish</button>
                    </div>
                </li>)}
            </ul>
        </section>
    </section>
}