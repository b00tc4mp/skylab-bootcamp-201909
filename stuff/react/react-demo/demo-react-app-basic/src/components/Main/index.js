import React from 'react'
import './index.sass'
import Feedback from '../Feedback'

export default function ({ tasks, id, onRegisterTask, onDeleteTask }) {
    return <div className='main'>
        {tasks.length > 0 && <ul className='main__ul'>
            {tasks.map(task => <li>
                <p>{task.description}</p>
                <p>{task.date}</p>
                <button onClick={() => onDeleteTask(task.id)}>Remove</button>
            </li>)}
        </ul>}
        <form onSubmit={(event) => {
            event.preventDefault()
            onRegisterTask(event, id)
        }}>
            <input type='text' name='task' />
            <button>Add</button>
        </form>
    </div>
}