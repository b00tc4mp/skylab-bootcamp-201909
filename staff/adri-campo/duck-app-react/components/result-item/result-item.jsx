function ResultItem({ item: { id, title, image, price }, onClick, onFav, isFav}) {
    return <li className="results__item">
        <a href="#" className="item" onClick={event => {
            event.preventDefault()

            onClick(id)
        }}>
            <h2 className="item__title">{title}</h2>
            <img className="item__image" src={image} />
            <span className="item__price">{price}</span>
            <div className="item__fav">
                <i className={`${isFav}`} onClick={event => {
                event.preventDefault()
                event.stopPropagation()

                onFav(id)
            }}></i></div>

        </a>
    </li>
}
 


