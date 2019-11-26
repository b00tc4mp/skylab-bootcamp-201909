import React, { useState, useEffect } from 'react'
// import {registerUser} from '../../logic' //crear logica de new game
import { authenticateUser } from '../../logic'
import { Route, withRouter, Redirect } from 'react-router-dom'

export default withRouter(function ({ history }) {
        
        const [username, setUsername] = useState('')
        const [password, setPassword] = useState('')

        const handleNewGame = async (e) => {
                e.preventDefault()
                try {
                        // await registerUser(username, location, email, password) //crear logica de new game
                        const token = await authenticateUser(username, password)
                        sessionStorage.token = token
                        history.push('/mygame')
                } catch (error) {
                        console.error(error)
                }
        }

        return <section className="game-newedit">
                <form onSubmit={handleNewGame}>
                        <h1 className="game-newedit__title">Add new game</h1>
                        <input className="game-newedit__field" type="text" name="game title" placeholder="game title" />
                        <input className="game-newedit__field" type="text" name="platform" placeholder="platform (ps4, xbox...)" />
                        <p className="game-newedit__subtitle">Pick if you want...</p>
                        <p className="game-newedit__sell"><input className="game-newedit__checkbox" type="checkbox" name="sell" value="sell" /><img src="img/sell.png"
                                alt="sell" />...to sell</p>
                        <p className="game-newedit__exchange"><input className="game-newedit__checkbox" type="checkbox" name="exchange" value="exchange" /><img
                                src="img/exchange.png" alt="exchange" />...to exchange</p>
                        <p className="game-newedit__favourite"><input className="game-newedit__checkbox" type="checkbox" name="favourite" value="favourite" /><img
                                src="img/favourite.png" alt="favourite" />...to mark as favourite</p>
                        <button className="game-newedit__addimg">Add game cover</button>
                        <button className="game-newedit__submit">Add</button>
                </form>
        </section>
})