import React from 'react'

export default function ({ currentUser: { user: { username } }, categories, onItem, onRegisterCategory }) {
debugger
  return <div className='aside'>
    <h1>{username}</h1>
    <ul>
      {categories.map(category =><li key={category.id.toString()}>{onItem(category)}</li>)}
    </ul>
    <form onSubmit={(event)=>{
        event.preventDefault()
        onRegisterCategory(event)
        }}>
            <input type='text' name='category'/>
            <button>Add</button>
        </form>
  </div>
}