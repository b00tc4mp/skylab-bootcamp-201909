import React, { useState, useEffect } from 'react'
import { retrieveUser } from '../../logic'

export default function ({ comment: { user, body, date } }) {

    const [username, setUsername] = useState()

    useEffect(() => {
        const { token } = sessionStorage;

        (async () => {
            if (token) {
                const { username } = await retrieveUser(token, user)

                setUsername(username)

            }
        })()
    }, [sessionStorage.token])

    return <>
        <p className="comment__user">{username}</p>
        <p className="comment__body">{body}</p>
        <p className="comment__date">{date}</p>
    </>
}