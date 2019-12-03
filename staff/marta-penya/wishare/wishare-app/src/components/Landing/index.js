import React from 'react'
import './index.sass'

export default function({ name, birthdays, onCreateWish, onSearchFriends }){
    return     <section className="landing hidden">
    <section className="landing__birthday">
    { !birthdays &&  <h2 className="landing__bdaytitle"> There is no friend's birthday nearby</h2>}

    { birthdays && <ul>
        {birthdays.map(bday => <li key={bday.id}>
            <h2 className="landing__bdaytitle"> {bday.name}'s birthday is comming on {bday.birthday}!! </h2>
        </li>)}
    </ul>}

    </section>

    <section className="landing__user user">
        <img className="user__image" src={process.env.PUBLIC_URL + '/img/profile.png'} alt="profile picture"/>
        <span className="user__welcome"> Hi {name}, what do you want to do?</span>
        <section className="landing__buttons">
            <button className="landing__btn" onClick={event => { event.preventDefault(); onCreateWish() }}> Create a Wish</button>
            <button className="landing__btn" onClick={event => { event.preventDefault(); onSearchFriends() }}> Search friends</button>
        </section>
    </section>

    <section className="landing__pendingwishes">
        <h2 className="landing__title">Pending Wishes</h2>
        <section className="landing__imgwishes">
            <img src={process.env.PUBLIC_URL + '/img/gift.png'} alt="pending wishes" className="landing__wish"/>
            <img src={process.env.PUBLIC_URL + '/img/gift.png'} alt="pending wishes" className="landing__wish"/>
            <img src={process.env.PUBLIC_URL + '/img/gift.png'} alt="pending wishes" className="landing__wish"/>
        </section>
    </section>

</section>
    
}