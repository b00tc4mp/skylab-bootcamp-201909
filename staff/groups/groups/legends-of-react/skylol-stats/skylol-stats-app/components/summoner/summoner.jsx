function Summoner({ summonerIds, rank, masteries, error}) {
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
            {rank.lenght> 0 && <p className="summoner-detail__elo">
                {`${rank[0].tier} ${rank[0].rank}`}</p>}
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
            <li className="summoner-detail__champion ">
                <article className="summoner-detail__container">
                    <p className="summoner-detail__name">
                    {masteries[1].name}
                    </p>
                    <img
                        className={`summoner-detail__image mastery-${masteries[1].championLevel}`}
                        src={masteries[1].image}/>
                    <p className="summoner-detail__points">
                    {masteries[1].championPoints}</p>
                </article>
            </li>
            <li className="summoner-detail__champion">
                <article className="summoner-detail__container">
                    <p className="summoner-detail__name">
                    {masteries[2].name}
                    </p>
                    <img
                        className={`summoner-detail__image mastery-${masteries[2].championLevel}`}
                        src={masteries[2].image}/>
                    <p className="summoner-detail__points">
                    {masteries[2].championPoints}</p>
                </article>
            </li>
            <li className="summoner-detail__champion">
                <article className="summoner-detail__container">
                    <p className="summoner-detail__name">
                    {masteries[3].name}
                    </p>
                    <img
                        className={`summoner-detail__image mastery-${masteries[3].championLevel}`}
                        src={masteries[3].image}/>
                    <p className="summoner-detail__points">
                    {masteries[3].championPoints}</p>
                </article>
            </li>
            <li className="summoner-detail__champion">
                <article className="summoner-detail__container">
                    <p className="summoner-detail__name">
                    {masteries[4].name}
                    </p>
                    <img
                        className={`summoner-detail__image mastery-${masteries[4].championLevel}`}
                        src={masteries[4].image}/>
                    <p className="summoner-detail__points">
                    {masteries[4].championPoints}</p>
                </article>
            </li>
            <li className="summoner-detail__champion">
                <article className="summoner-detail__container">
                    <p className="summoner-detail__name">
                    {masteries[5].name}
                    </p>
                    <img
                        className={`summoner-detail__image mastery-${masteries[5].championLevel}`}
                        src={masteries[5].image}/>
                    <p className="summoner-detail__points">
                    {masteries[5].championPoints}</p>
                </article>
            </li>
          
        </ul>
    </div>
    {error && <Feedback message={error} />}
</section>

}
