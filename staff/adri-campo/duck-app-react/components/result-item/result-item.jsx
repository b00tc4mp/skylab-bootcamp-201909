function ResultItem ({ onResultItem }) { 
    return  <section className="view result-item _hide">
        <form onClick={ event => {
            event.preventDefault()
            
            onResultItem(id)
        }}>
        
        <li key={Math.random()} className="results__item">
            <a href="" className="item">
            <h2 className="item__title">{duck.title} </h2>
            <img src={duck.imageUrl} className="item__image" />
            <p className="item__price">{duck.price} </p>

            </a>    
        </li>
        </form>
    </section>
}
