import React, { useState, useContext, useEffect, useCallback } from 'react'
import Item from '../Item'
import logic from '../../logic'
import HomeContext from '../HomeContext'
import Context from '../CreateContext'

export default function ({ currentUser: { user: { username } }, categories }) {

  const { setCategories, setIdCategory, retreiveTasks } = useContext(HomeContext)
  const { setError } = useContext(Context)
  const [ control, setControl ] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        const categories = await logic.retrieveCategory()
        if (categories.length > 0) {
          const [{ id }] = categories
          retreiveTasks(id)
          setIdCategory(id)
        }
        setCategories(categories)
      } catch ({ message }) {
        setError(message)
      }
    })()
  }, [control])

  const registerCategory = useCallback(async(event) => {
    const { category: { value: name } } = event.target
    await logic.registerCategory(name)
    setControl(!control)
},[control])

/*   const handleRegisterCategory = async event => {
    const { category: { value: name } } = event.target
    await logic.registerCategory(name)
    setControl(!control)
  } */

  return <div className='aside'>
    <h1>{username}</h1>
    <ul>
      {categories&&categories.map(category => <li key={category.id.toString()}>{<Item onControl={setControl} control={control} category={category} />}</li>)}
    </ul>
    <form onSubmit={(event) => {
      event.preventDefault()
      registerCategory(event)
    }}>
      <input type='text' name='category' />
      <button>Add</button>
    </form>
  </div>
}