function DetailCast({ item : {name} , onBack}) {

    return <p className="details__director">Director<span className="details__subtitle"></span>{name}</p>
        <div className="details__cast">
            <h2 className="details__subtitle">Cast</h2>
            <ul className="cast">
                <li className="cast__name">{name}</li>
            </ul>
        </div>
        <a className="details__back" href="" onClick={event => {
            event.preventDefault()

            onBack()
        }}>Go bacK</a>
}