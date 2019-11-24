import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import {registerUser} from '../../logic'

export default function({  }) {
    const [username, setUsername] = useState('')
    const [location, setLocation] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleRegister =async (e)=>{
        e.preventDefault()
        try {
            await registerUser(username, location, email, password)
        } catch(error) {
            console.error(error)
        }
    }

    const isDisabled = !username || !location || !email || !password

    return <section class="register">
            <form onSubmit={handleRegister}>
                <h1 class="register__title">Register</h1>
                <input class="register__field" type="text" name="username" placeholder="username" onChange={({target})=>setUsername(target.value)} />
                <input class="register__field" type="text" name="location" placeholder="location" onChange={({target})=>setLocation(target.value)} />
                <input class="register__field" type="email" name="email" placeholder="e-mail" onChange={({target})=>setEmail(target.value)} />
                <input class="register__field" type="password" name="password" placeholder="password" onChange={({target})=>setPassword(target.value)} />
                {/* <button class="register__addimg">Add profile image</button> */}
                <button class="register__submit" disabled={isDisabled}>Register</button>
            </form>
        </section>
//     const [username, setUsername] = useState('')
//     const [password, setPassword] = useState('')

//     const handleLogin =async (e)=>{
//         e.preventDefault();
//         try {
//             const token = await authenticateUser(username, password)
//             sessionStorage.token = token
          
//         } catch (error) {
//             console.error(error)
//         }
//     }
//     const isDisabled = !username || !password

//     return <section className="login">
//     <form onSubmit={handleLogin}>
//         <h1 className="login__title">Login</h1>
//         <input className="login__field" type="text" name="username" placeholder="username" onChange={({target})=>setUsername(target.value)}/>
//         <input className="login__field" type="password" name="password" placeholder="password" onChange={({target})=>setPassword(target.value)}/>
//         <button className="login__submit" disabled={isDisabled}>Login</button>
//         <p className="login__gotoregister">Are you not registered?<br />
//             <Link to='/register'>
//                 Sign up now!
//             </Link>
//         </p>
//     </form>
// </section>
}