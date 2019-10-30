function Search( {error, query, onSubmit} ){
    return    <section className="search">
    <h2 className="search__title">Search</h2>
    <form className="search__form" onSubmit={event => {
            event.preventDefault()

            const query = event.target.query.value

            onSubmit(query)
        }}>

        <input type="text" className="search__field" name="query" placeholder="Summoner"/>
        <button className="search__submit"><i className="fas fa-search"></i></button>
    </form>
    {error && <Feedback message={error} />}

    {/* {results && onResultsRender(results)} */}

</section>
}