/* import React from 'react'
import '../../../src/index.sass'
import Lesson from '../Lesson'

export default function({user, lessons, onChangeLessonStatus}){

    return <section className="lesson-list">
        <h3 className="lesson-list__title">Lessons list</h3>
        <h4 className="lesson-list__user">{user}</h4>
        <ul className="lesson-list__items">
            {lessons.map(lesson => <li className="lesson-list__item" key={lesson.id}><Lesson lesson={lesson} onChangeStatus={onChangeLessonStatus} /></li>)}
        </ul>
    </section>
} */