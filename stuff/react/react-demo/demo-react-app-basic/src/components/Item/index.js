import React from 'react'

export default function ({ category: { id, name }, onExtend, onDeleteCategory }) {

  return <>
    <a href='' onClick={(event) => {
      event.preventDefault()
      onExtend(id)
    }
    }>{name}</a>
    <button onClick={(event) => {
      event.preventDefault()
      onDeleteCategory(id)
    }}>remove</button>
  </>
}