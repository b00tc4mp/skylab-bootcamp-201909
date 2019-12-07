import React from 'react'
import { saveImageUser } from '../../logic'
import { withRouter } from 'react-router-dom'

export default withRouter(function ({ history }) {

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

    return <section className="updateprofile">
        <form id="imgform" onSubmit={e => {
            e.preventDefault()

            handleSaveImageUser()
        }}>
            <h1 className="updateprofile__title">Update profile image</h1>
            <input type="file" name="filetoupload" id="imguser" className="updateprofile__addimg" />
            <button className="updateprofile__submit">Update image</button>
        </form>
    </section>
})