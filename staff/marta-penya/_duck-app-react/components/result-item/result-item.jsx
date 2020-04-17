function ResultItem({item, onGoDetail, onFav}){

    const {id, title, imageUrl, price, isFav} = item

    return <li className="item-list__li"> 
    <a className="item-list__link" onClick= {
        event => {
            event.preventDefault()

            onGoDetail(id)
        }
    }>
    
        <h2 className="item-list__title">{title} </h2>
        <img src={imageUrl} className="item-list__image"/>
        <p className="item-list__price">{price} </p>
        <img className="item-list__fav" src={isFav ? "https://image.flaticon.com/icons/svg/1469/1469575.svg" : "https://image.flaticon.com/icons/svg/1469/1469600.svg"} onClick={event => {
                event.preventDefault()
                event.stopPropagation()                

                onFav(id)
            }}/>
        </a>
    </li>
    
}
