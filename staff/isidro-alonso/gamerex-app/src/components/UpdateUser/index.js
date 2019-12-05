import React, { useState } from 'react'
import { modifyUser, saveImageUser } from '../../logic'
import { withRouter } from 'react-router-dom'

export default withRouter(function ({ history }) {

    const { location: { pathname } } = history
    const id = pathname.substr(12)

    const [username, setUsername] = useState('')
    const [location, setLocation] = useState('')
    const [password, setPassword] = useState('')

    async function handleUpdateUser(username, location, password) {
        try {
            const { token } = sessionStorage

            await modifyUser(token, id, username, location, password)

            history.push('/myuser')

        } catch (error) {
            console.error(error)
        }
    }

    async function handleSaveImageUser() {
        try {
            const { token } = sessionStorage

            let fileInput = document.getElementById('imguser')
            
            let file = fileInput.files[0]

            await saveImageUser(token, file)

            history.push('/myuser')

        } catch (error) {
            console.error(error)
        }
    }

    const isDisabled = !username || !location || !password

    return <section className="updateprofile">
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
        <form id="imgform" onSubmit={e => {
            e.preventDefault()

            handleSaveImageUser()
        }}>
            <p className="updateprofile__subtitle">Update profile image</p>
            <input type="file" name="filetoupload" id="imguser" className="updateprofile__addimg" />
            <button className="updateprofile__submit">Update image</button>
        </form>
    </section>
})