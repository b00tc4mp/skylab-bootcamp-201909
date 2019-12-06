import React from 'react'
import '../../../src/template/index.sass'
import Team from '../Team'
import { Link } from 'react-router-dom'

export default function({user, teams, onChangeTeamStatus}) {

      //const {teamName: { Name } , teamEmail: { Mail }, teamPhone: { Phone }, teamActivity: { Activity }} = teams.user
      //const { name: { value: name }, surname: { value: surname }, email: { value: email }, username: { value: username }, password: { value: password } } = event.target

    return <>
           <h4 className="team-list__user">user: {user}</h4>
           <ul className="team-list team-list__title"> TEAM LIST
           <Link className="team-list team-list__back" to="/board-admin">Go back</Link>
            {teams.map(team => <li className="team-list__item" key={team.id}>{<Team team={team} onChangeStatus={onChangeTeamStatus} />}</li>)}
           </ul>
        </>
}

/* 
<h4 className="team-list__user">trying desctructuring: {user}, {Name}, {Mail}, {Phone}, {Activity}</h4>
{
	"_id" : ObjectId("5de912ac1b1dd52126111a02"),
	"user" : ObjectId("5de826f91b1dd521261119fd"),
	"teamName" : "Cleo-7",
	"teamEmail" : "cleo@mail.com",
	"teamPhone" : "777",
	"teamActivity" : "ski",
	"__v" : 0
} */


/*                     return <section className="team-list">
<h3 className="team-list__title">Lessons list</h3>

</section>
*/

/* export default function ({ tasks, onChangeTaskStatus }) {
    return <ul className="task-list">
        {tasks.map(task => <li className="task-list__item" key={task.id}><Task task={task} onChangeStatus={onChangeTaskStatus} /></li>)}
    </ul> */