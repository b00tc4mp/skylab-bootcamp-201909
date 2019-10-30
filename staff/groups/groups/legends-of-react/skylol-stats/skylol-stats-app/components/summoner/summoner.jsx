function Summoner({ summonerIds, masteries}) {
    debugger
    return <section className="summoner-detail">
    <div className="summoner-detail__info">
        <img
            className="summoner-detail__icon"
            src={`http://ddragon.leagueoflegends.com/cdn/9.21.1/img/profileicon/${summonerIds.profileIconId}.png`}/>
        <div className="summoner-detail__profile">
            <h2 className="summoner-detail__nickname">{summonerIds.name}</h2>
            <p className="summoner-detail__level">
            {summonerIds.summonerLevel}
            </p>
            <p className="summoner-detail__elo">
                Gold I</p>
        </div>
    </div>

    <div className="summoner-detail__champions">
        <ul className="summoner-detail__list">
            <li className="summoner-detail__champion">
                <article className="summoner-detail__container">
                    <p className="summoner-detail__name ">
                        {masteries[0].name}
                    </p>
                    <img
                        className={`summoner-detail__image mastery-${masteries[0].championLevel}`}
                        src={masteries[0].image}/>
                    <p className="summoner-detail__points">
                        {masteries[0].championPoints}</p>
                </article>
            </li>
            <li className="summoner-detail__champion">
                <article className="summoner-detail__container">
                    <p className="summoner-detail__name">
                        Jinx
                    </p>
                    <img
                        className="summoner-detail__image mastery-seven"
                        src="https://ddragon.leagueoflegends.com/cdn/9.13.1/img/champion/Jinx.png"/>
                    <p className="summoner-detail__points">
                        378.234</p>
                </article>

            </li>
            <li className="summoner-detail__champion ">
                <article className="summoner-detail__container">
                    <p className="summoner-detail__name">
                        Miss Fortune
                    </p>
                    <img
                        className="summoner-detail__image mastery-seven"
                        src="https://ddragon.leagueoflegends.com/cdn/9.13.1/img/champion/MissFortune.png"/>
                    <p className="summoner-detail__points">
                        305.234</p>
                </article>
            </li>
            <li className="summoner-detail__champion">
                <article className="summoner-detail__container">
                    <p className="summoner-detail__name">
                        Janna
                    </p>
                    <img
                        className="summoner-detail__image mastery-six"
                        src="https://ddragon.leagueoflegends.com/cdn/9.13.1/img/champion/Janna.png"/>
                    <p className="summoner-detail__points">
                        299.234</p>
                </article>
            </li>
            <li className="summoner-detail__champion">
                <article className="summoner-detail__container">
                    <p className="summoner-detail__name">
                        Morgana
                    </p>
                    <img
                        className="summoner-detail__image mastery-five"
                        src="https://ddragon.leagueoflegends.com/cdn/9.21.1/img/champion/Morgana.png"/>
                    <p className="summoner-detail__points">
                        250.234</p>
                </article>
            </li>
            <li className="summoner-detail__champion">
                <article className="summoner-detail__container">
                    <p className="summoner-detail__name">
                        Zyra
                    </p>
                    <img
                        className="summoner-detail__image mastery-none"
                        src="https://ddragon.leagueoflegends.com/cdn/9.21.1/img/champion/Zyra.png"/>
                    <p className="summoner-detail__points">
                        200.234</p>
                </article>
            </li>
        </ul>
    </div>
</section>
}
