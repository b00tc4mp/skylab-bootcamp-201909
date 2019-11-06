function Search({ onSearch, error, query }) {
    return <section className="view search _hide">
        <div>
    <form className="search__form" onSubmit={ event => {
            event.preventDefault()

            const query = event.target.query.value
                
            onSearch(query)
    }

    }>               
        <input type="search" name="query" id="search__formitem" className="search__input"/>
        <button className="search__button">🔎 Search</button>
    </form>
</div> 
{error && <Feedback message={error}/>}      
</section>

}

