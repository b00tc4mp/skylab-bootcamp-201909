import React from 'react'
import './index.sass'

export default function ({categories, onItem, onRegisterCategory }) {
  debugger
  return <div className='aside'>
    <ul className="category-list">
      {categories && categories.map((category , index) =><li key={index.toString()}>{onItem(category)}</li>)}
    </ul>
    <form onSubmit={(event)=>{
        event.preventDefault()
        onRegisterCategory(event)
        }}>
            <input className = "input-add" type='text' name='category'/>
            <button className="btn btn--submit btn--add">Add</button>
        </form>
  </div>
}