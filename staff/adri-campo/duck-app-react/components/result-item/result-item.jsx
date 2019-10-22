function ResultItem ({ onResultItem }) { debugger
    return  <section className="view result-item _hide">
        <form onClick={function (event) {
            event.preventDefault()
            
            onResultItem()
        }}>
        
        <li kew={Math.random()} className="results__item">
        <a href="" className="item">
        <h2 className="item__title">{duck.title} </h2>
        <img src={duck.imageUrl} className="item__image" />
        <p className="item__price">{duck.price} </p>      
        </a>    
    </li>
    </form>
    </section>
}