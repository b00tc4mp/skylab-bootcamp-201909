function Detail({ champ, onFav }) {
    debugger
    return <section className="detail">
    <div className="detail__content">
        <img className="detail__image" src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ[0].id}_0.jpg`}
            alt=""/>
        <div className="detail__info">
        <img className="item-list__fav" src={champ[0].isFav ? "https://image.flaticon.com/icons/svg/1469/1469575.svg" : "https://image.flaticon.com/icons/svg/660/660465.svg"} onClick={event => {
               event.preventDefault()
               event.stopPropagation()
               onFav(champ[0].link, champ[0].id)
           }}/>
            <p className="detail__id">{champ[0].name}</p>
            <p className="detail__title">{champ[0].title}</p>
            <p className="detail__tags">{champ[0].tags}</p>
            <p className="detail__description">{champ[0].lore}</p>
            <ul className="detail__spells spells">
                <div>
                    <li><img data-tippy-content={champ[0].spells[0].name + champ[0].spells[0].description} className="spells__image"
                            src={`http://ddragon.leagueoflegends.com/cdn/9.18.1/img/spell/${champ[0].spells[0].image.full}`}
                            alt=""/>
                    </li>
                </div>
                <div>
                    <li><img data-tippy-content={champ[0].spells[1].name + champ[0].spells[1].description}  className="spells__image"
                            src={`http://ddragon.leagueoflegends.com/cdn/9.18.1/img/spell/${champ[0].spells[1].image.full}`}
                            alt=""/>
                    </li>
                </div>
                <div>
                <li><img data-tippy-content={champ[0].spells[2].name + champ[0].spells[2].description}  className="spells__image"
                            src={`http://ddragon.leagueoflegends.com/cdn/9.18.1/img/spell/${champ[0].spells[2].image.full}`}
                            alt=""/>
                    </li>
                </div>
                <div>
                <li><img data-tippy-content={champ[0].spells[3].name + champ[0].spells[3].description}  className="spells__image"
                            src={`http://ddragon.leagueoflegends.com/cdn/9.18.1/img/spell/${champ[0].spells[3].image.full}`}
                            alt=""/>
                    </li>
                </div>
                <div>
                <li><img data-tippy-content={champ[0].passive.name + champ[0].passive.description}  className="spells__image"
                            src={`http://ddragon.leagueoflegends.com/cdn/9.18.1/img/passive/${champ[0].passive.image.full}`}
                            alt=""/>
                    </li>
                </div>
                
            </ul>
        </div>
    </div>
    <div>
        <p className="detail__stats"></p>
    </div>
    
    </section>
    
}




