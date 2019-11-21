import React, { useState } from 'react';

// COMPONENTS
import Register from '../Register';
import Login from '../Login';
import Home from '../Home';

import Context from '../CreateContext'

export default function App() {

    const [user, setUser] = useState(undefined)
    const [error, setError] = useState(undefined)
    const [view, setView] = useState('register')

 
    return <div className="App">
        <Context.Provider value={{setView, setError}}>
            {view === 'register' && <Register error={error} />}
            {view === 'login' && <Login error={error} onUser={setUser} />}
            {view === 'home' && <Home user={user} error={error} />}
        </Context.Provider>
    </div>

}

