import React, { useState } from 'react'
import { searchUser } from '../../logic'
import { withRouter } from 'react-router-dom'
import Feedback from '../Feedback'

export default withRouter(function({ history }) {

    const [users, setUsers] = useState([])

    const [error, setError] = useState('')

    async function handleSearch(query) {
        try {
            const { token } = sessionStorage
            
            const users = await searchUser(token, query)

            setUsers(users)

            history.push('/search')
        } catch (error) {
            setError(error.message.toString())
        }
    }

    return <section className="search">
        {error && <Feedback message={error} />}
        <form onSubmit={e => {
            e.preventDefault()

            const query = e.target.query.value
            
            handleSearch(query)
        }}>
            <input className="search__field" type="search" name="query" placeholder="search collector" />
            <button className="search__button"><img src="img/search.png" alt="search" /></button>
        </form>
    </section>
})