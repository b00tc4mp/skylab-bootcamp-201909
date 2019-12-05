import React from 'react'
import { Link } from 'react-router-dom'
import '../../template/index.sass'


export default function({user, onLessonList, onTeamList}) {

return <section className="board admin">
        <h4 className="admin__user">{user}</h4>
        <h3 className="admin__lessonlist"><a href="/lessonlist" onClick={event => { event.preventDefault(); onLessonList() }}>Lesson list</a></h3>
        <h3 className="admin__teamlist"><a href="/teamlist" onClick={event => { event.preventDefault(); onTeamList()}}>Team list</a></h3>

        
    </section>


}
