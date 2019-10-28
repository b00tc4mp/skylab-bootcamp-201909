function Header({onLogin, onRegister, error}) {
    return  <header class="header">

            <div class="header__bg">
                    <video autoplay muted loop class="header__bg--video">
                            <source src="https://www.spacex.com/sites/spacex/files/spx01_fairing-1080_v3.mp4" type="video/mp4"/>
                    </video>
            </div>

            <h1 class="header__title">Odyssey SpaceX</h1>

            <nav class="header__nav">
                    <div class="header__nav--logo">
                            <img title="Home" src="https://www.spacex.com/sites/spacex/files/spacex_logo_white.png"></img>
                    </div>
                    <div class="header__nav--bar">
                        <a class="header__nav--bar__button">Login</a>
                        <a class="header__nav--bar__button">Sign Up</a>
                    </div>
                    
            </nav>

        </header>
                 
        <article class="about">
                
                <h2 class="about__title">Who we are?</h2>
                
                <div class="about__text">
                    <p class="about__text--justify">
                        Space Exploration Technologies Corp., doing business as SpaceX, is a private American aerospace manufacturer and space transportation services company headquartered in Hawthorne, California. It was founded in 2002 by Elon Musk with the goal of reducing space transportation costs to enable the colonization of Mars. SpaceX has developed the Falcon launch vehicle family and the Dragon spacecraft family.
                        
                    </p>
                </div>

        </article> 
}