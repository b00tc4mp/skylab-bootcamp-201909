import React from 'react'
import '../../../src/index.sass'
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
}
