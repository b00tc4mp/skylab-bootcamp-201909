function ListItem ({item, onClick}) {
    return <li className="search-results__list-item list-item" onClick={ event => {
        event.preventDefault()
        onClick(item.id)
    }}>
        <article className="search-results__inside">
            <div className="list-item__container">
                <h2 className="list-item__title">{item.name}</h2>
                <img className="list-item__img" src={item.image_url}/>
                <p className="list-item__text">{item.tagline}</p>
            </div>
        </article>
    </li>
}