import React from 'react'
import '../../../src/template/index.sass'
import Team from '../Team'
import { Link } from 'react-router-dom'

export default function({user, teams, onChangeTeamStatus}) {

      //const {teamName: { Name } , teamEmail: { Mail }, teamPhone: { Phone }, teamActivity: { Activity }} = teams.user
      //const { name: { value: name }, surname: { value: surname }, email: { value: email }, username: { value: username }, password: { value: password } } = event.target

    return <>
           <h4 className="team-list team-list__user">user: {user}</h4>
           <section className="team-list team-list__nav">
           <Link className="team-list team-list__createTeam" to="/create-team">Create new Team</Link>
           <Link className="team-list team-list__back" to="/board-admin">Go back</Link>
           </section>
           <ul className="team-list team-list__title"> TEAM LIST
            {teams.map(team => <li className="team-list__item" key={team.id}>{<Team team={team} onChangeStatus={onChangeTeamStatus} />}</li>)}
           </ul>
        </>
}



//<h3 className="admin__teamlist"><a href="/teamlist" onClick={event => { event.preventDefault(); onTeamList()}}>Team list</a></h3>