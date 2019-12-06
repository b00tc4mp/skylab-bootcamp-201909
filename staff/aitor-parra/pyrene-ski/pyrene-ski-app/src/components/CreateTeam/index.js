import React, { useState } from 'react'

export default function ({ onSubmit }) {
    const [teamName, setTeamName] = useState('')
    const [teamEmail, setTeamEmail] = useState('')
    const [teamPhone, setTeamPhone] = useState('')
    const [teamActivity, setTeamActivity] = useState('')

    return <section className="view">
        <h3 className="team-create__title">Create team member</h3>
        <form onSubmit={event => {
            event.preventDefault()
            onSubmit(teamName, teamEmail, teamPhone, teamActivity)
            setTeamName('')
            setTeamEmail('')
            setTeamPhone('')
            setTeamActivity('')
        }}>
            <input type="text" name="teamName" value={teamName} onChange={event => setTeamName(event.target.value)} />
            <input type="text" name="teamEmail" value={teamEmail} onChange={event => setTeamEmail(event.target.value)}/>
            <input type="text" name="dTeamPhone" value={teamPhone} onChange={event => setTeamPhone(event.target.value)}/>
            <input type="text" name="TeamActivity" value={teamActivity} onChange={event => setTeamActivity(event.target.value)}/>
            <button>Create</button>

        </form>

    </section>

}

/* import React from 'react'
import '../../template/index.sass'
import Feedback from '../Feedback'


export default function({ user, onCreateTeam, onBack, error}) {

    return <section className="team-create">
    <h3 className="team-create__title">Create team member</h3>
    <h4 className="team-create__user">{user}</h4>
    <form className="team-create__form" onSubmit={function (event) {
        event.preventDefault()

        const { teamName: { value: teamName }, teamEmail: { value: teamEmail }, teamPhone: { value: teamPhone }, teamActivity: { value: teamActivity} } = event.target

        onCreateTeam(teamName, teamEmail, teamPhone, teamActivity)

    }}>
        <input className="team-create__field" type="text" name="teamName" placeholder="name"/>
        <input className="team-create__field" type="email" name="teamEmail" placeholder="e-mail"/>
        <input className="team-create__field" type="phone" name="teamPhone" placeholder="phone"/>
        <input className="team-create__field" type="text" name="teamActivity" placeholder="activity"/>
        <button className="team-create__button">Submit</button>
    </form>
    <h2 className="team-create__goback"><a href="/" onClick={event => {
            event.preventDefault()

            onBack()

        }}>Go Back</a></h2> 

        {error && <Feedback message={error} />}
</section>
} */
