import React, { useState, useEffect } from 'react'
import './index.sass'
import { Route, withRouter, Redirect } from 'react-router-dom'
import { retrieveUser } from '../../logic'
import getRoute from '../../routes'
import Header from '../Header'

export default withRouter(function ({history}) {

    useEffect(() => {
        const { token } = sessionStorage;

        (async () => {
            if (token) {
                const { name } = await retrieveUser(token)

                // setName(name)

                // await retrieveTasks(token)
            }
        })()
    }, [sessionStorage.token])

    const {location: {pathname}} = history
    const CurrentRoute = getRoute(pathname)
    return <>
        <Header />
        <CurrentRoute />
    </>
})
