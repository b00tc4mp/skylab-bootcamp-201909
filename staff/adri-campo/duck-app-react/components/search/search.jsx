function Search( { onSubmit, results, error, onResultsRender, user, query, onClick} ) { 
    return <section className="view search">
        <h1 className="search__title">Search 🐣</h1>
        <h2 className="search__user">{user}</h2>
        <form onSubmit= { event => {
            event.preventDefault()

            const query = event.target.query.value 

            onSubmit(query)
        }}>
            <span className="search__icon"></span>
            <input className="search__criteria" type="text" name="query" placeholder="criteria" defaultValue={query}></input>
            <button className="search__submit">🔍</button>
        </form>
        
        <form onClick = { event => {
            event.preventDefault()

            onClick()
        }}>
        <button className="search__logout">Logout</button>
        </form>

        {error && <Feedback message={error} />}

        {results && onResultsRender(results)}
        
    </section>
}