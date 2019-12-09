import React from 'react'
import './index.sass'
import MyAds from '../MyAds'
export default function ({ ads, user: {name, surname, city, address}, adDetail, onDeleteAd, onToUpdateAd }) {
    return <section className='profile'>
                <h1 className="profile__title">Profile</h1>
                <form className="profile__form">
                    <input type="text" className="profile__field" name="name" placeholder={name}/>
                    <input type="text" className="profile__field" name="surname" placeholder={surname} />
                    <input type="text" className="profile__field" name="city" placeholder={city}/>
                    <input type="text" className="profile__field" name="address" placeholder={address}/>
                    <button className="profile__button">Update</button>
                </form>
                <MyAds ads={ads} adDetail={adDetail} onDeleteAd={onDeleteAd} onToUpdateAd={onToUpdateAd}/>
            </section> 
             
}