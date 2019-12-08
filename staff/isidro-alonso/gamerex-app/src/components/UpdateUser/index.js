import React, { useState } from 'react'
import { modifyUser } from '../../logic'
import { withRouter } from 'react-router-dom'
import Feedback from '../Feedback'

export default withRouter(function ({ history }) {

    const { location: { pathname } } = history
    const id = pathname.substr(12)

    const [username, setUsername] = useState('')
    const [location, setLocation] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState('')

    async function handleUpdateUser(username, location, password) {
        try {
            const { token } = sessionStorage

            await modifyUser(token, id, username, location, password)

            history.push('/myuser')

        } catch (error) {
            setError(error.message.toString())
        }
    }

    const isDisabled = !username || !location || !password

    return <section className="updateprofile">
        {error && <Feedback message={error} />}
        <form onSubmit={e => {
            e.preventDefault()

            handleUpdateUser(username, location, password)
            setUsername('')
            setLocation('')
            setPassword('')

        }}>
            <h1 className="updateprofile__title">Update profile</h1>
            <input className="updateprofile__field" type="text" name="username" placeholder="username" onChange={event => setUsername(event.target.value)} />
            <input className="updateprofile__field" type="text" name="location" placeholder="location" onChange={event => setLocation(event.target.value)} />
            <input className="updateprofile__field" type="password" name="password" placeholder="password" onChange={event => setPassword(event.target.value)} />
            <button className="updateprofile__submit" disabled={isDisabled}>Update info</button>
        </form>
    </section>
})