import React, { useState, useEffect } from 'react'
import './index.sass'
import Welcome from '../Welcome'
import Register from '../Register'
import Login from '../Login'
import { Route, withRouter, Redirect } from 'react-router-dom'

export default withRouter(function () {
  //const [name, setName] = useState()
  //const [view, setView] = useState('')
  
  const { token } = sessionStorage

  // useEffect(() => {
  //   if (history.location.pathname === '/') setView(undefined)
  // }, [history.location])
  
  

  return (
    <>
      <Route exact path="/" render={() => token ? <Redirect to="/landing" /> : <Welcome />} />
      < Route path='/register' render={() => token ? <Redirect to='/landing' /> : <Register />} />
      < Route path='/login' render={() => token ? <Redirect to='/landing'/> : <Login /> } />

    </>
  )
})


