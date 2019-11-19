import React from 'react'
import './index.sass'

export default function ({ message }) {
    return <div className="feedback-panel">
        <p className="feedback__text">{message}</p>
    </div>
}