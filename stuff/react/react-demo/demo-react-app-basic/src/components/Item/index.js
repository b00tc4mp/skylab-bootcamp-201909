import React from 'react'

export default function ({ category:{id, name}, onExtend }) {
  return <li><a href='' onClick={(event)=>{
    event.preventDefault()
    onExtend(id)
    }
  }>{name}</a></li>
}