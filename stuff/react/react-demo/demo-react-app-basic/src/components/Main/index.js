import React from 'react'
import Feedback from '../Feedback'

export default function ({ tasks, id }) {
    debugger
    return <div>
        {tasks.length > 0 && <ul>
            {tasks.map(task => <li>{task}</li>)}
        </ul>}
   {/*      <form onSubmit={(id)=>

    } */}
    </div>
}