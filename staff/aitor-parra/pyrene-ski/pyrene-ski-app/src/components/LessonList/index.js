import React from 'react'
import './index.sass'


export default function({user}){

    return     <section className="lesson-list">
    <h3 className="lesson-list__title">Lessons list</h3>
    <h2 className="lesson-list__team-member">{user}</h2>
    <ul className="lesson-list__team-list">
        <li className="lesson-list__team-list-item">15/10/2019, 09:00</li>

    </ul>

</section>

}


import React from 'react'
import './index.sass'
import Task from '../Task'

export default function ({ tasks, onChangeTaskStatus }) {
    return <ul className="task-list">
        {tasks.map(task => <li className="task-list__item" key={task.id}><Task task={task} onChangeStatus={onChangeTaskStatus} /></li>)}
    </ul>
}