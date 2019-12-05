import React from 'react'
import '../../../src/template/index.sass'
import Team from '../Team'
import { Link } from 'react-router-dom'

export default function({user, teams, onChangeTeamStatus}) {

    return <section className="team-list">
        <h3 className="team-list__title">Lessons list</h3>
        <h4 className="team-list__user">{user}</h4>
        <ul className="team-list__team_items">
            {teams.map(team => <li className="team-list__item" key={team.id}>{<Team team={team} onChangeStatus={onChangeTeamStatus} />}</li>)}
        </ul>
        <Link className="register__back" to="/board-admin" >Go back</Link>
    
    </section>
}



