import React, {useState} from 'react'
import { saveImageGame } from '../../logic'
import { withRouter } from 'react-router-dom'
import Feedback from '../Feedback'

export default withRouter(function ({ history }) {

        const { location: { pathname } } = history
        const gameId = pathname.substr(15)

        const [error, setError] = useState('')

        async function handleSaveImageGame() {
                try {
                        const { token } = sessionStorage

                        let fileInput = document.getElementById('imggame')

                        let file = fileInput.files[0]

                        await saveImageGame(token, gameId, file)

                        history.push('/myuser')

                } catch (error) {
                        setError(error.message.toString())
                }
        }

        return <section className="game-newedit">
                {error && <Feedback message={error} />}
                <form id="imgform" onSubmit={e => {
                        e.preventDefault()

                        handleSaveImageGame()
                }}>
                        <h1 className="game-newedit__title">Update game image</h1>
                        <input type="file" name="filetoupload" id="imggame" className="game-newedit__addimg" />
                        <button className="game-newedit__submit">Update image</button>
                </form>
        </section>
})