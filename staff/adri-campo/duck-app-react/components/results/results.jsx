function Results ( { items,  } ) { 
    return  <ul className="results" key={Math.random()} >
                {items.map(item => <ResultsItem onResult={duck} /> )}
            </ul>
           
}