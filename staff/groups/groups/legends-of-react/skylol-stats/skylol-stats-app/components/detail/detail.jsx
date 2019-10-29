function Detail({ champ, onBack}) {

    return <section className="view detail _hide">
        <h2 className="detail__title">{champ[0].title}</h2>
        <img className="detail__image" src={champ[0].icon} />
        <p className="detail__description">{champ[0].lore}</p>
        <span className="detail__price">{champ[0].name}</span>
        <a className="detail__back" href="" onClick={event => {
            event.preventDefault()

            onBack()
        }}>Go back</a>
    </section>
}