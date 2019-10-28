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


//     <header className="header">
//     <h1 className="header__title">SkyLol Stats</h1>
//     <img className="header__image" src="https://media3.giphy.com/media/j2vvUlEg8XfK5rU5Aw/giphy.webp?cid=790b76114e5443017a7fdad0d1c9fef6b360c0cd09a3a3bb&rid=giphy.webp" alt="thresh gif"/>
//     <button className="header__button" onClick={
//         event => {
//             event.preventDefault()

//             onHome()
//         }
//     }>Home</button>
//     <button className="header__button" onClick={
//         event => {
//             event.preventDefault()

//             onLogin()
//         }
//     }>Login</button>
//     <button className="header__button" onClick={
//         event => {
//             event.preventDefault()

//             onRegister()
//         }
//     }>Register</button>
//     <button className="header__button" onClick={
//         event => {
//             event.preventDefault()

//             onContact()
//         }
//     }>Website Contact</button>
//     <div className="header__div">  
//     {user && <p className="header__user">{`hello ${user}`}</p>}
//    {user && <button className="header__button" onClick={
//         event => {
//             event.preventDefault()

//             onSignOut()
//         }
//     }>Sign Out</button> }
//       </div>  
//     </header>