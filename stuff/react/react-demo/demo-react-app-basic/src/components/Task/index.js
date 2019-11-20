import React from 'react'
import Feedback from '../Feedback'

export default function ({ tasks }) {
    return <div>
        <ul>{
            tasks && tasks.length && tasks.map(task=>
            <li>{task}</li>)
            }</ul>
    </div>
}