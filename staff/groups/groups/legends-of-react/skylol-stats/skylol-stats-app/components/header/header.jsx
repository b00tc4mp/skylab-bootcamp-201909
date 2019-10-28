function Header( { user, onHome, onLogin, onRegister, onSummoners, onChampions, onSignOut } ) {
    
    return <header className="header">
    <img src="https://media.giphy.com/media/YbFasFa6Fh5HW/giphy.gif" alt="" className="header__logo"/>
    <div className="header__div">
            <div className="header__div2">
                <h1 className="header__title">SkyLoL Stats</h1>
                <div className="user__name">
                    {user && <p className="header__user">{`Hello ${user}`}</p>}
                    {user && <button className="header__signout" onClick={
                    event => {
                    event.preventDefault()

                    onSignOut()
                    }}>Sign out</button>}
                </div>
            </div>
        <nav>
            <ul className="navigation">
                <li className="navigation__item" onClick={
        event => {
            event.preventDefault()

            onHome()
        }
             }>Home</li>
                <li className="navigation__item" onClick={
        event => {
            event.preventDefault()

            onLogin()
        }
    }>Login</li>
                <li className="navigation__item" onClick={
        event => {
            event.preventDefault()

            onRegister()
        }
    }>Register</li>
                <li className="navigation__item" onClick={
        event => {
            event.preventDefault()

            onSummoners()
        }
    }>Summoners</li>
                <li className="navigation__item" onClick={
        event => {
            event.preventDefault()

            onChampions()
        }
    }>Champions</li>
            </ul>

        </nav>
    </div>
</header>
    }

