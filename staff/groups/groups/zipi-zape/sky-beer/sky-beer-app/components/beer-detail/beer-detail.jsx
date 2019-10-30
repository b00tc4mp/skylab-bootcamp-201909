function BeerDetail  ({beer, onClose}) {

    return <section className="main__beer-detail beer-detail">
                                    <i className="close fas fa-times" onClick={e=>{
                                    e.preventDefault()
                                    onClose()
                                } }></i>
                <h2 className="beer-detail__title">{beer.name}</h2>
                    <h4>{beer.tagline}</h4>
                <div className="beer-detail__iteminfo iteminfo">
                    <div className="iteminfo__imageContainer">
                        <img className="iteminfo__image" src={beer.image_url}/>
                    </div>
                    <div className="iteminfo__container container"> 
                        <p className="container__description">{beer.description}</p>
                        <div className="beer-detail__moreinfo moreinfo">
                            <div className="moreinfo__level"><div>BEER ABV</div><div>- {beer.abv}% -</div></div>
                            <div className="moreinfo__level"><div>BEER IBU</div><div>- {beer.ibu} -</div></div>
                            <div className="moreinfo__level"><div>BEER EBC</div><div>- {beer.ebc} -</div></div>
                        </div>
                        <div>Maridage suggestions:</div>
                        <ul className="container__list">
                            <li>{beer.food_pairing[0]}</li>
                            <li>{beer.food_pairing[1]}</li>
                            <li>{beer.food_pairing[2]}</li>
                        </ul>
                    </div>  
                </div>
                <span className="beer-detail__brewers-tips">{beer.brewers_tips}</span>
        </section>


}
