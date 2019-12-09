import React from 'react'
import '../../template/index.sass'


export default function({user, onBookLessons, onLogout }) {

return <section className="board client">
        <h4 className="client__user">{user}</h4>
        <h3 className="client__lessonbooked"><a href="/book-lesson" onClick={event => { event.preventDefault(); onBookLessons() }}>Book lessons</a></h3>
    
        <section className="logo">
        <img className="logo__image" src="./images/ski_silouette_white_shadow.png" alt="skier silouette"/>
        </section>
        <h3 className="client__logout"><a href="/logout" onClick={event => { event.preventDefault(); onLogout()}}>Logout</a></h3>
    
    </section>
    
    
    
}


/* 

<h3 className="client__lessonlist"><a href="/lessonlist" onClick={event => { event.preventDefault(); onLessonList() }}>Lesson list</a></h3>

*/
