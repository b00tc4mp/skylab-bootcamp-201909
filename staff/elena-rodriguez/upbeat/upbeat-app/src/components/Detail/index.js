import React, { useEffect } from 'react'
import { retrieveMusician } from '../../logic/'
import { Link } from 'react-router-dom'

export default function ({ musician , favs, onToggleFavs}) {
    

    const { username, description, rol, format, email, image, links, upcomings, location, id } = musician
    


    return <> {musician && favs && <section className="profile">
         <div className="profile__header">
            <h2 className='profile__username'>{username}</h2>
            <p className='profile__position'>{(rol === "solo" && format) ? format.instruments.join() : format.groups}</p>
        </div>
        <div className="location-container">
            <i className="fas fa-map-marker-alt"></i>
            <p className="profile__ubication">{location}</p>
        </div>
        <div className="user-content">
            <div className="image-container" onClick={event => {
             event.preventDefault()
             event.stopPropagation()
             onToggleFavs(musician.id)
        }}>
            { rol === "solo" && <img className="user-content__img" src={image ? image : "images/default/solo.jpg"}/>}
            { rol === "groups" && <img className="user-content__img" src={image ? image : "images/default/groups.jpg"}/>}
               <i className="far fa-heart" id={favs.includes(id) ? "fav" : ""}></i>
            </div>
            <p className="user-content__description">{description}</p>
            <h2 className='user-content__subtitle'>Some of my work:</h2>
            <a className="user-content__links"
                href="http://tallerdemusics.com/festival-talent/viernes-29-de-junio/oriol-colome/" target="_blank">
                Taller De Músics</a>
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
    </section>} </>
}