import React from 'react'
import '../../../src/template/index.sass'
import Lesson from '../Lesson'
import { Link } from 'react-router-dom'

export default function({user, lessons, onChangeLessonStatus}){

    return <ul className="lesson-list">
            {lessons.map(lesson => <li className="lesson-list__item" key={lesson.id}>{ <Lesson lesson={lesson} onChangeStatus={onChangeLessonStatus} /> }</li>)}
            <h4 className="lesson-list__user">{user}</h4>
            <Link className="register__back" to="/board-admin" >Go back</Link>
        </ul>
    } 
    
    /*  
    return <h3 className="lesson-list__title">Lessons list</h3>
      <section className="lesson-list">
    </section> */