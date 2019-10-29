function ChampionItem({item}){
    const tagList = item.tags.map((tag,i) => {return <li key={i.toString()}>{tag}</li>})
    return  <a className="champion__ancore" href="#">
    <li className="champion__content">
        <p className="champion__name">{item.name}</p>
        <div className="champion__container">
            <div className="champion__info">
            <ul className="champion__tags">{tagList}</ul>
            </div>
            <img className="champion__image"
                src={item.icon} alt=""/>
        </div>
    </li>
</a>
}