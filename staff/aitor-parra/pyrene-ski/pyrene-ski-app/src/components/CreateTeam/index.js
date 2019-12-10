import React from 'react'
import '../../template/index.sass'
import Feedback from '../Feedback'
import { Link } from  'react-router-dom'

export default function({ user, onCreateTeam, error }) {
    return <section className="team-create">
        <h4 className="team-create__user">user: {user}</h4>
        <h3 className="team-create__title">Create TEAM</h3>
        <Link className="team-create__back" to="/teamlist">back to TEAM LIST</Link>
        <form className="team-create__form" onSubmit={function (event) {debugger
            event.preventDefault()

            const { teamName: { value: teamName }, teamEmail: { value: teamEmail }, teamPhone: { value: teamPhone }, teamActivity: { value: teamActivity } } = event.target

            onCreateTeam(teamName, teamEmail, teamPhone, teamActivity)
        }}>
            <input className="team-create__field" type="text" name="teamName" required="true" placeholder="name"/>
            <input className="team-create__field" type="email" name="teamEmail" placeholder="e-mail"/>
            <input className="team-create__field" type="tel" min="9" max="9" pattern="[0-9]{3}[ -][0-9]{2}[ -][0-9]{2}[ -][0-9]{2}" name="teamPhone" placeholder="000-00-00-00"/>
            <input className="team-create__field" type="text" name="teamActivity" placeholder="activity"/>
            <button className="team-create__button">Submit</button>
        </form>

        {error && <Feedback message={error} />}
</section>

}

/* 
<a className="team-create__back" href="/" onClick={event => {
            event.preventDefault()

            onBack()
        }}>Go back</a>



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
            <input type="text" name="teamPhone" value={teamPhone} onChange={event => setTeamPhone(event.target.value)}/>
            <input type="text" name="teamActivity" value={teamActivity} onChange={event => setTeamActivity(event.target.value)}/>
            <button type="submit" title="create-team-button">Create</button>

        </form>

    </section>


<span className="lesson__lessonDelete">
<form method="delete" onSubmit={event => { event.preventDefault(); onDeleteLesson(id) }}>
    <button type="submit" title="delete-button">❌</button>
</form>
</span>



}
 */
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
