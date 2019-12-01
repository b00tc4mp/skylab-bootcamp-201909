import React, { useState, useEffect } from 'react'
import { listUsers } from '../../logic'
import './index.sass'
import UserItem from '../UserItem'

export default function () {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const { token } = sessionStorage;

        (async () => {
            if (token) {
                const userList = await listUsers(token)
                setUsers(userList)
            }
        })()
    }, [sessionStorage.token])

    return <><h1 className="user-list__title">Best collectors</h1>
        <section className="user-list">
            {users.map(user => <section className="user-item" key={user.id}><UserItem user={user} /></section>)}
        </section></>
}