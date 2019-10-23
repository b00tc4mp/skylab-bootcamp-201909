function Search( { onSearch } ) { 
    const { onSearch } = props
    return <section className="view search _hide">
        <h1 className="search__title">Search 🐣</h1>
        <form onSubmit= { event => {
            event.preventDefault()
            const query = event.target.query.value 
            onSearch(query)
        }}>
            <span className="search__icon"></span>
            <input className="search__criteria" type="text" name="query" placeholder="criteria"></input>
            <button className="search__submit">🔍</button>
        </form>
        
        <section className="feedback hide">
            <span className="feedback__icon">⚠️⚠️</span>
            <p className="feedback__message">Something went wrong...</p>
            <span className="feedback__icon">⚠️⚠️</span>
        </section>

        <ul className="results">
        </ul>

    </section>
}