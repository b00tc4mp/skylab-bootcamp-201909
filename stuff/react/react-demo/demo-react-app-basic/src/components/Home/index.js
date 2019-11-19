import React from 'react'

export default function ({ onCategory, onItem }) {
  
  return <ul>
    {onCategory.map(category => onItem(category) )}
  </ul>
}