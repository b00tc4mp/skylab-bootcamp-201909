function Detail({ item: { id, title, overview, poster_path, runtime, release_date, vote_average, isFav }, onBack, onFav }) { 

    return <div className="details">
                <h1 className="details__title">
                
                <a className="details__back" href="" onClick={event => {
                        event.preventDefault()
                        
                        onBack()
                    }}><i className="fas fa-backward"></i> &#x20;Back</a>
                    {title}<span className="details__year"> ({release_date.slice(0, 4)})</span>
                
                </h1>
                        
                <img src={poster_path} alt="Film" className="details__img"/>
                <div className="details__rating rating">
                    <span className="rating__score">{vote_average}</span>
                    <button className="rating__button">
                        <a href="" className="mov__fav" onClick={event => {
                            event.preventDefault()
                            onFav(id, "detail")
                            }}>
                        {isFav ? <i className="fas fa-heart"></i> : <i className="far fa-heart"></i>}
                        </a>
                    </button>
                    
                </div>
                <div className="details__overview overview">
                    <h2 className="details__subtitle">Synopsis/Plot</h2>
                    <p className="overview__text">{overview}</p>
                </div>
{/*                 <p className="details__director">Director<span className="details__subtitle"></span>{}</p>
                <div className="details__cast">
                <h2 className="details__subtitle">Cast</h2>
                    <ul className="cast">
                        <li className="cast__name">Actor</li>  
                    </ul>
                </div> */}
                <br/>
    </div>
}

