import React from 'react'

export default function ({ currentUser: { user: { username } }, categories, onItem }) {
debugger
  return <div>
    <h1>{username}</h1>
    <ul>
      {categories.map(category => onItem(category))}
    </ul>
  </div>
}