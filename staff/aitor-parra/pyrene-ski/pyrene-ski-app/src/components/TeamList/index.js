import React from 'react'
import './index.sass'
import Team from '../Team'



export default function({user, teams, onChangeTeamStatus}) {

    return <section className="team-list">
        <h3 className="team-list__title">Lessons list</h3>
        <h4 className="team-list__user">{user}</h4>
        <ul className="teamteam_items">
            {teams.map(team => <li className="team-list__item" key={team.id}><Team team={team} onChangeStatus={onChangeTeamStatus} /></li>)}
        </ul>
    
    </section>
}


