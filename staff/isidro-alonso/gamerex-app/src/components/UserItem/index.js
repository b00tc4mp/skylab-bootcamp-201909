import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { retrieveMyUser } from '../../logic'

export default withRouter(function ({ user: {_id: userId, username} }) {
    const [id, setId] = useState()

    useEffect(() => {
        const { token } = sessionStorage;

        (async () => {
            if (token) {
                const { id } = await retrieveMyUser(token)

                setId(id)

            }
        })()
    }, [sessionStorage.token])

    const img = 'img/nodata.png'

    const userLink = (userId !== id)? `/userinfo/${userId}`:'/myuser';

    return <Link to={userLink} className="user-item__link" >
        <img className="user-item__img" src={img} alt="user" />
        <p className="user-item__username">{username}</p>
    </Link>
})