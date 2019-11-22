// COMPONENTS
import React, { /* useContext */ useState, useCallback } from 'react'
import Aside from '../Aside'
import Main from '../Main'
// import Context from '../CreateContext'
import HomeContext from '../HomeContext'
import './index.sass'

// LOGIC
import logic from '../../logic'

export default function ({ user, error }) {

/*     const { setError } = useContext(Context)
 */    
    const [categories, setCategories] = useState(undefined)
    const [idCategory, setIdCategory] = useState(undefined)
    const [tasks, setTasks] = useState([])
    

    const retreiveTasks = useCallback(async(idCategory) => {
        const tasks = await logic.retrieveTaskByCategory(idCategory)
        setTasks(tasks) 
    },[])
   
    
/* 
    const handleTasksCategory = async (idCategory) => {
        try {
            const tasks = await logic.retrieveTaskByCategory(idCategory)
            setTasks(tasks)
            setIdCategory(idCategory)
      
        } catch ({ message }) {
            setError(message)        }
      } */

    return <div className='home'>
        <HomeContext.Provider value={{setCategories, setIdCategory, setTasks, retreiveTasks}}>
        <Aside currentUser={user} categories={categories} />
        <Main error={error} tasks={tasks} id={idCategory} />
        </HomeContext.Provider>
    </div>
}
