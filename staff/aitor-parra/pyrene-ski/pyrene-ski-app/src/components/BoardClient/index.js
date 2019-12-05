import React from 'react'
import '../../template/index.sass'


export default function({user, onLessonList }) {

return <section className="board client">
        <h4 className="client__user">{user}</h4>
        <h3 className="client__lessonlist"><a href="/teamlist" onClick={event => { event.preventDefault(); onLessonList() }}>Lesson list</a></h3>
        <h3 className="client__lessonbooked"><a href="/teamlist" onClick={event => { event.preventDefault(); }}>Lessons booked</a></h3>
    </section>


}
