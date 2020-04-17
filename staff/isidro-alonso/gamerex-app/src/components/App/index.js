import React from 'react'
import './index.sass'
import { withRouter } from 'react-router-dom'
import getRoute from '../../routes'
import Header from '../Header'

export default withRouter(function ({ history }) {

    const { location: { pathname } } = history
    const CurrentRoute = getRoute(pathname)
    return <>
        <Header />
        <main>
            <CurrentRoute />
        </main>
    </>
})
