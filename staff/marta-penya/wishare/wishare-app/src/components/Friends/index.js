import React from 'react'
import './index.sass'
import Friend from '../Friend'

export default function({onSearchFriends, friends}){
    return <section className="friends">
    <section className="friends__header">
        <h1 className="friends__title">Friends</h1>
        <section className="friends__buttons">
            <button className="friends__btn"> Your friends</button>
            <button className="friends__btn" onClick={event => { event.preventDefault(); onSearchFriends() }}> Find friends</button>
        </section>
    </section>

    <ul className="friends__list">
        { friends.map(friend => <a className="searchf__link" key={friend._id}><Friend friend={friend} /></a>)}
    </ul>
</section>
}