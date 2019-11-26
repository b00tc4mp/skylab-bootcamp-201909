import React, { useState, useEffect } from 'react'
import {createGame} from '../../logic'
import { Route, withRouter, Redirect } from 'react-router-dom'

export default withRouter(function ({ history }) {
        
        const [title, setTitle] = useState('')
        const [platform, setPlatform] = useState('')
        const [sell, setSell] = useState('')
        const [exchange, setExchange] = useState('')
        const [favourite, setFavourite] = useState('')

        const handleNewGame = async (e) => {
                e.preventDefault()
                // onSubmit(title, platform, sell, exchange, favourite)
                setTitle('')
                setPlatform('')
                setSell('')
                setExchange('')
                setFavourite('')
                try {
                        const { token } = sessionStorage
                        await createGame(token, title, platform, sell, exchange, favourite)
                        sessionStorage.token = token
                        // await retrieveGames(token)
                        history.push('/mygame')
                } catch (error) {
                        console.error(error)
                }
        }

//         const [title, setTitle] = useState('')
//     const [description, setDescription] = useState('')

//     return <section className="view">
//         <h2>New task</h2>
//         <form onSubmit={event => {
//             event.preventDefault()

//             onSubmit(title, description)

//             setTitle('')
//             setDescription('')
//         }}>
//             <input type="text" name="title" value={title} onChange={event => setTitle(event.target.value)} />
//             <input type="text" name="description" value={description} onChange={event => setDescription(event.target.value)}/>
//             <button>Add</button>
//         </form>
//     </section>

// async function handleNewTask(title, description) {
//         try {
//             const { token } = sessionStorage

//             await createTask(token, title, description)

//             await retrieveTasks(token)
//         } catch (error) {
//             console.error(error)
//         }
//     }

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