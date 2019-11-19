import React from 'react'

export default function ({ categories, onItem }) {
  
  return <ul>
    {categories.map(category => onItem(category) )}
  </ul>
}