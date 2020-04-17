function Header({ onLogout, onSearch, weather, onMyFav , onDiscover}) {

    return <header className="header">

        <nav className="main__nav nav" role="navigations">
            <div className="nav__logo">
            <a href="" className="nav__a" onClick={event => {
                                    onDiscover()
                                }}>
                <p className="company-name">faxTV</p>
            </a>
            </div>
            <Weather weather={weather}/>
            <Search onSubmit={onSearch}/>
            <ul className="nav__menu menu">
                <li className="menu__item">
                    <i className="fas fa-user-circle"></i>
                    <i className="fas fa-ellipsis-v"></i>
                    <ul className="menu_sub">
                        <li className="menu_sub__item">
                            <a href="" className="link" onClick={event => {
                                    event.preventDefault()
                                    onMyFav()
                                }}>
                                Favorites
                            </a>
                        </li>
                        <li className="menu_sub__item">
                            <a href="" className="link" onClick={event => {
                                event.preventDefault()
                                onLogout()
                            }}>
                                <i className="fas fa-power-off"></i> Log Out
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    </header>

}
