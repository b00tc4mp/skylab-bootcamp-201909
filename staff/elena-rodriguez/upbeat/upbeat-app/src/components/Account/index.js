import React from 'react'
// import { retrieveMusician } from '../../logic/'
import { Link } from 'react-router-dom'

export default function ({ user }) {debugger


    const { username, description, rol, format, email, image, links, upcomings, location} = user
   


    return <>{user && <section className="profile account">
        <div className="profile__header">
            <h2 className='profile__username'>{username}</h2>
            <p className='profile__position'>{(rol === "solo") ? format.instruments.join() : format.groups}</p>
        </div>
        <div className="location-container">
            <i className="fas fa-map-marker-alt"></i>
            <p className="profile__ubication">{location}</p>
        </div>
        <div className="user-content">
            <div className="image-container">
            { rol === "solo" && <img className="user-content__img" src={image ? image : "images/default/solo.jpg"}/>}
            { rol === "groups" && <img className="user-content__img" src={image ? image : "images/default/groups.jpg"}/>}
            </div>
            <p className="user-content__description">{description}</p>
            
            {links && <><h2 className='user-content__subtitle'>More about me:</h2><a className="user-content__links"
                href={links} target="_blank"><i className="fas fa-link"></i></a></>} 
            <h2 className='user-content__subtitle'>Upcoming performances:</h2>
            <p className="user-content__activities">{upcomings}
            </p>
            <h2 className='user-content__subtitle'>Contact me: </h2>
            <div className="contact-icons">
                <a href={"mailto:" + email}><i className="far fa-envelope"></i></a>
                <button className="chat"><i className="far fa-comments"></i></button>
            </div>
        </div>
        <Link className="go-back" to="/"> Go back</Link>
    </section>}</>
}