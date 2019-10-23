function Results ( { onResult } ) { 
    <section>
    <ul className="results" key={Math.random()} >
        {ducks.map(duck => <Results onResult={duck} /> )}
    </ul>
    </section>

    return onResult(duck)
    
    // <li kew={Math.random()} className="results__item">
    //     <a href="" className="item">
    //     <h2 className="item__title">{duck.title} </h2>
    //     <img src={duck.imageUrl} className="item__image" />
    //     <p className="item__price">{duck.price} </p>      
    //     </a>    
    // </li>
}

{/* <section className="view ducks">
<ul className="results" key={Math.random()} >
    {ducks.map(duck => <Results onResult={duck} /> )}
</ul>
</section> */}