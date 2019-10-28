function Search(){
    return <section class="search">
    <h2 class="search__title">Search</h2>
    <form class="search__form" onSubmit={event => {
            event.preventDefault()

            const query = event.target.query.value

            onSubmit(/*query*/)
        }}>>
        <input type="text" class="search__field" name="summoner" placeholder="Summoner"/>
        <button class="search__submit"><i class="fas fa-search"></i></button>
    </form>

    {error && <Feedback message={error} />}
    </section>
}