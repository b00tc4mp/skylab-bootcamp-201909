function Header( { user, onSignOut } ) {
    
    return <header className="header">
    <h1 className="header__title">DUCK APP</h1>
    <img className="header__image" src="https://www.favicon.cc/logo3d/75350.png" alt="duck image"/>
    <div className="header__div">  
    {user && <p className="header__user">{`hello ${user}`}</p>}
   {user && <button className="header__button" onClick={
        event => {
            event.preventDefault()

            onSignOut()
        }
    }>Sign Out</button> }
      </div>  
    </header>
    }
