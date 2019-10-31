function Detail({ champ }) {
    debugger
    const tagList = champ[0].tags.map((tag,i) => {return <li key={i.toString()}>{tag}</li>})
    return <section className="detail">
    <div className="detail__content">
        <img className="detail__image" src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ[0].id}_0.jpg`}
            alt=""/>
        <div className="detail__info">
            <p className="detail__id">{champ[0].name}</p>
            <p className="detail__title">{champ[0].title}</p>
            <ul className="detail__tags">{tagList}</ul>
            <p className="detail__description">{champ[0].lore}</p>
            <ul className="detail__spells spells">
                <div>
                    <a rel="shadowbox;width=405;height=340;" title={champ[0].spells[0].name + "\n"  + champ[0].spells[0].description}  href= {`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${videoUrl(champ[0].key)}/ability_${videoUrl(champ[0].key)}_Q1.webm`} target="_blank">
                        <li>
                            <img className="spells__image" src={`http://ddragon.leagueoflegends.com/cdn/9.18.1/img/spell/${champ[0].spells[0].image.full}`} alt=""/>                            
                        </li>
                    </a>
                </div>
                <div>
                    <a rel="shadowbox;width=405;height=340;" title={champ[0].spells[1].name + "\n"  + champ[0].spells[1].description}  href= {`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${videoUrl(champ[0].key)}/ability_${videoUrl(champ[0].key)}_W1.webm`} target="_blank">
                        <li>
                            <img className="spells__image" src={`http://ddragon.leagueoflegends.com/cdn/9.18.1/img/spell/${champ[0].spells[1].image.full}`} alt=""/>                            
                        </li>
                    </a>
                </div>
                <div>
                    <a rel="shadowbox;width=405;height=340;" title={champ[0].spells[2].name + "\n"  + champ[0].spells[2].description}  href= {`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${videoUrl(champ[0].key)}/ability_${videoUrl(champ[0].key)}_E1.webm`} target="_blank">
                        <li>
                            <img className="spells__image" src={`http://ddragon.leagueoflegends.com/cdn/9.18.1/img/spell/${champ[0].spells[2].image.full}`} alt=""/>                            
                        </li>
                    </a>
                </div>
                <div>
                    <a rel="shadowbox;width=405;height=340;" title={champ[0].spells[3].name + "\n"  + champ[0].spells[3].description}  href= {`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${videoUrl(champ[0].key)}/ability_${videoUrl(champ[0].key)}_R1.webm`} target="_blank">
                        <li>
                            <img className="spells__image" src={`http://ddragon.leagueoflegends.com/cdn/9.18.1/img/spell/${champ[0].spells[3].image.full}`} alt=""/>                            
                        </li>
                    </a>
                </div>
                <div>
                    <a rel="shadowbox;width=405;height=340;" title={champ[0].passive.name + "\n"  + champ[0].passive.description}  href= {`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${videoUrl(champ[0].key)}/ability_${videoUrl(champ[0].key)}_P1.webm`} target="_blank">
                        <li>
                        <img className="spells__image"
                            src={`http://ddragon.leagueoflegends.com/cdn/9.18.1/img/passive/${champ[0].passive.image.full}`}
                            alt=""/>                            
                        </li>
                    </a>
                </div>               
            </ul>
        </div>
    </div>
    <div>
        <p className="detail__stats"></p>
    </div>
    
    </section>
    
}




