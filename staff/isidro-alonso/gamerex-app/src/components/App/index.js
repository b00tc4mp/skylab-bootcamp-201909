import React, { useState, useEffect } from 'react'
import './index.sass'
import { Route, withRouter, Redirect } from 'react-router-dom'
import getRoute from '../../routes'
import Header from '../Header'

export default withRouter(function ({history}) {
    const {location: {pathname}} = history
    const CurrentRoute = getRoute(pathname)
    return <>
        <Header />
        <CurrentRoute />
    </>
})
