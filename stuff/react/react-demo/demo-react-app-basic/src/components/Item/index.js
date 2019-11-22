import React from 'react'
import './index.sass'
import '../../styles/button.sass'

export default function ({ category: { id, name }, onExtend, onDeleteCategory }) {

  return <>
    <div className="item">
      <button className="btn btn--category" href='' onClick={(event) => {
        event.preventDefault()
        onExtend(id)
      }
      }>{name}</button>
      <button className="btn btn--remove" onClick={(event) => {
        event.preventDefault()
        onDeleteCategory(id)
      }}>x</button>
    </div>
  </>
}