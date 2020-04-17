function FavItem({item, onDetail, onFav}){
    
    const tagList = item.tags.map((tag,i) => {return <li key={i.toString()}>{tag}</li>})
    return  <a className="favs__ancore" href="#" onClick={
        event => {
            event.preventDefault()

            onDetail(item.link)
        }
             }>
    <li className="favs__content">
        <p className="favs__name">{item.name} <span>
        <img className="item-list__fav" src={item.isFav ? "https://image.flaticon.com/icons/svg/1469/1469575.svg" : "https://image.flaticon.com/icons/svg/660/660465.svg"} onClick={event => {
               event.preventDefault()
               event.stopPropagation()

               onFav(item.id)
           }}/>
            </span></p>
        <div className="favs__container">
            <div className="favs__info">
            <ul className="favs__tags">{tagList}</ul>
            </div>
            <img className="favs__image"
                src={item.icon} alt=""/>
        </div>
    </li>
</a>
}