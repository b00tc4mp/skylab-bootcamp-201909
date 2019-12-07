import React from 'react'
import { saveImageUser } from '../../logic'
import { withRouter } from 'react-router-dom'
import Feedback from '../Feedback'

export default withRouter(function ({ history }) {

    const [error, setError] = useState('')

    async function handleSaveImageUser() {
        try {
            const { token } = sessionStorage

            let fileInput = document.getElementById('imguser')
            
            let file = fileInput.files[0]

            await saveImageUser(token, file)

            history.push('/myuser')

        } catch (error) {
            setError(error.toString())
        }
    }

    return <section className="updateprofile">
        {error && <Feedback message={error} />}
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