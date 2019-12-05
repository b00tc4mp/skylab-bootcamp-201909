import React from 'react'
import '../../../src/template/index.sass'
/* import Lesson from '../Lesson' */
import { Link } from 'react-router-dom'

export default function({user, lessons, onChangeLessonStatus}){

    return <section className="lesson-list">
        <h3 className="lesson-list__title">Lessons list</h3>
        <h4 className="lesson-list__user">{user}</h4>
        <ul className="lesson-list__items">
            {lessons.map(lesson => <li className="lesson-list__item" key={lesson.id}>{/* <Lesson lesson={lesson} onChangeStatus={onChangeLessonStatus} /> */}</li>)}
        </ul>
        <Link className="register__back" to="/board-admin" >Go back</Link>
    </section>
} 