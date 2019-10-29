function BeerDetail  ({beer, onClose}) {

    return <section className="main__beerdetail beerdetail">
                                    <i className="close fas fa-times" onClick={e=>{
                                    e.preventDefault()
                                    onClose()
                                } }></i>
                <h2 className="beerdetail__title">{beer.name}</h2>
                    <h4>{beer.tagline}</h4>
                <div className="beerdetail__iteminfo iteminfo">
                    <div className="iteminfo__imageContainer">
                        <img className="iteminfo__image" src={beer.image_url}/>
                    </div>
                    <div className="iteminfo__container container"> 
                        <p className="container__description">{beer.description}</p>
                        <div className="beerdetail__moreinfo moreinfo">
                            <span className="moreinfo__level">BEER ABV - {beer.abv}% -</span>
                            <span className="moreinfo__level">BEER IBU - {beer.ibu} -</span>
                            <span className="moreinfo__level">BEER EBC - {beer.ebc} -</span>
                        </div>
                        <ul className="container__list"><div>Maridage suggestions:</div>
                            <li>{beer.food_pairing[0]}</li>
                            <li>{beer.food_pairing[1]}</li>
                            <li>{beer.food_pairing[2]}</li>
                        </ul>
                    </div>  
                </div>
                <span className="beerdetail__brewers-tips">{beer.brewers_tips}</span>
        </section>


}
