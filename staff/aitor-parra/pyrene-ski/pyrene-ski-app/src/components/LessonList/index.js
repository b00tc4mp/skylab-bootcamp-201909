import React from 'react'
import '../../../src/template/index.sass'
import Lesson from '../Lesson'
import { Link } from 'react-router-dom'

export default function({user, lessons, onDeleteLesson }){

return <>
    <h4 className="lesson-list lesson-list__user">user: {user}</h4>
        <section className="lesson-list lesson-list__nav">
            <Link className="lesson-list lesson-list__addLesson" to="/add-lesson">Add new Lesson</Link>
            <Link className="lesson-list lesson-list__back" to="/board-admin">Go Back</Link>
       </section>
    <ul className="lesson-list lesson-list__title">LESSON LIST
    {lessons.map(lesson => <li className="lesson-list__item" key={lesson.id}>{ <Lesson lesson={lesson} onDeleteLesson={onDeleteLesson} /> }</li>)}
    </ul>
</>
    } 
    /*  
    {users.role === 'admin' ? <Link className="lesson-list lesson-list__back" to="/board-admin" >Go back</Link> : <Link className="lesson-list lesson-list__back" to="/board-client" >Go back</Link>}
    <Link className="lesson-list lesson-list__back" to="/">Go back</Link>
    {user.role === 'admin' } <Link className="lesson-list lesson-list__back" to="/board-admin" >Go back</Link>
    {user.role === 'client'} <Link className="lesson-list lesson-list__back" to="/board-client" >Go back</Link>
    return <h3 className="lesson-list__title">Lessons list</h3>
      <section className="lesson-list">
    </section> */