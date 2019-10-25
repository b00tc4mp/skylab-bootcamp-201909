function Results ( { items, onItemRender } ) { 
    return  <ul className="results">
                {items.map(item => onItemRender(item))}
                
                { items.map ((item) => item.fav ? <Results-item isFav={'fa fa-hand-spock-o'}/> : 
                <Results-item isFav={'fa fa-hand-lizard-o'}/> )}

            </ul>
           
}