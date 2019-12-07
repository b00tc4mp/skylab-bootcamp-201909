import React from 'react'
import '../../../src/template/index.sass'

export default function ({ team: { id, teamName, teamEmail, teamPhone, teamActivity }, onRemoveTeam }) {
    return <a href="/teamlist" className={'team'}>{/* {id} */}
        <p className="team__teamName">{teamName} </p>
        <p className="team__teamEmail">{teamEmail} </p>
        <p className="team__teamPhone">{teamPhone} </p>
        <p className="team__teamActivity">{teamActivity} </p>


    </a>
}
/*         
--------- TO DELETE TEAM --------
<span className="team__teamDelete">
    <form method="delete" onSubmit={event => { event.preventDefault(); onRemoveTeam(id) }}>
        <button type="submit" title="delete-button">❌</button>
    </form>
</span>
---------------------------------

*/
