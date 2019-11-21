import React, { useContext, useCallback } from 'react'
import './index.sass'
import Feedback from '../Feedback'
import logic from '../../logic'
import HomeContext from '../HomeContext'

export default function ({ tasks, id, error }) {
    const { retreiveTasks } = useContext(HomeContext)

    const deleteTasks = useCallback(async(taskId) => {
        await logic.deleteTask(id, taskId)
        retreiveTasks(id) 
    },[id, retreiveTasks])

    const registerTask = useCallback(async(event, idCategory) => {
        const { task: { value: task } } = event.target

        await logic.registerTask(idCategory, task)
        retreiveTasks(idCategory) 
    },[retreiveTasks])

    
/*     const handleDeleteTask = async taskId => {debugger
        await logic.deleteTask(id, taskId)
        retreiveTasks(id)
    } */

/*     const handleRegisterTask = async (event, idCategory) => {
        const { task: { value: task } } = event.target

        await logic.registerTask(idCategory, task)
        retreiveTasks(idCategory)
    } */

    return <div className='main'>
        {tasks.length > 0 && <ul className='main__ul'>
            {tasks.map(task => <li key={task.id} >
                <p>{task.description}</p>
                <p>{task.date}</p>
                <button onClick={() => deleteTasks(task.id)}>Remove</button>
            </li>)}
        </ul>}
        <form onSubmit={(event) => {
            event.preventDefault()
            registerTask(event, id)
        }}>
            <input type='text' name='task' />
            <button>Add</button>
        </form>
        {error && <Feedback message={error} />}
    </div>
}