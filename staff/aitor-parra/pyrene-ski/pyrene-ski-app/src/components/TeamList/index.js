import React from 'react'
import '../../../src/template/index.sass'
import Team from '../Team'
import { Link } from 'react-router-dom'

export default function({user, teams, onChangeTeamStatus}) {debugger

   return  <ul className="team-list">
            {teams.map(team => <li className="team-list__item" key={team.id}>{<Team team={team} onChangeStatus={onChangeTeamStatus} />}</li>)}
            <h4 className="team-list__user">{user}</h4>
            <Link className="register__back" to="/board-admin" >Go back</Link>
        </ul>
    
}


/*                     return <section className="team-list">
<h3 className="team-list__title">Lessons list</h3>

</section>
*/

/* export default function ({ tasks, onChangeTaskStatus }) {
    return <ul className="task-list">
        {tasks.map(task => <li className="task-list__item" key={task.id}><Task task={task} onChangeStatus={onChangeTaskStatus} /></li>)}
    </ul> */