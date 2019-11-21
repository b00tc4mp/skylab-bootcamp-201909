import React, { useContext } from 'react'
import logic from '../../logic'
import HomeContext from '../HomeContext'
import Context from '../CreateContext'

export default function ({ category: { id, name }, onControl, control }) {

  const { setIdCategory, setTasks } = useContext(HomeContext)
  const { setError } = useContext(Context)


  const handleTasksCategory = async (idCategory) => {
    try {
      const tasks = await logic.retrieveTaskByCategory(idCategory)
      setTasks(tasks)
      setIdCategory(idCategory)

    } catch ({ message }) {
      setError(message)
    }
  }

  const handleDeleteCategory = async idCategory => {

    await logic.deleteCategory(idCategory)
    onControl(!control)
  }

  return <>
    <a href=' ' onClick={(event) => {
      event.preventDefault()
      handleTasksCategory(id)
    }}>{name}</a>
    <button onClick={() => {
      handleDeleteCategory(id)
    }}>remove</button>
  </>
}