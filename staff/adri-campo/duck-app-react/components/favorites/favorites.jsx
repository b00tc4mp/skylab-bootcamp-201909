function Favorites ({ onBack, onClick, error }) {

    return <section className="view favorites">
                <h1 className="favorites__title">FAV DUCK's</h1>

                <a className="favorites__back" href="" onClick={event => {
                    event.preventDefault()

                    onBack()
                }}>Go back</a>

                 <form onClick = { event => {
                    event.preventDefault()

                    onClick()
                }}>
                    <button className="search__logout">Logout</button>
                </form>


                {error && <Feedback message={error} />}

    </section>

}
