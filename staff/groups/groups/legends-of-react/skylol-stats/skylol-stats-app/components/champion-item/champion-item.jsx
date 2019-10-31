function ChampionItem({item, onDetail, onFav}){
    debugger
    const tagList = item.tags.map((tag,i) => {return <li key={i.toString()}>{tag}</li>})
    return  <a className="champion__ancore" href="#" onClick={
        event => {
            event.preventDefault()

            onDetail(item.link)
        }
             }>
    <li className="champion__content">
        <p className="champion__name">{item.name} <span>
        <img className="item-list__fav" src={item.isFav ? "https://image.flaticon.com/icons/svg/1469/1469575.svg" : "https://image.flaticon.com/icons/svg/660/660465.svg"} onClick={event => {
               event.preventDefault()
               event.stopPropagation()
               onFav(item.id)
           }}/>
            </span></p>
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