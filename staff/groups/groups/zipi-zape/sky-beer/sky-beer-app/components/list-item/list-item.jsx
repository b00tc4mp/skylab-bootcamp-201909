function ListItem ({item, onClick}) {
    return <li onClick={ event => {
        event.preventDefault()
        onClick(item.id)
    }}>
        <article className="beers__random-beer random-beer">
            <div className="random-beer__inside">
                <h2 className="random-beer__title">{item.name}</h2>
                <img className="random-beer__img" src={item.image_url}/>
                <p className="random-beer__text">{item.tagline}</p>
            </div>
        </article>
    </li>
}