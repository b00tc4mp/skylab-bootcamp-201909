function Search({ onSubmit, query, typeMedia }){

    return <div className="nav__search">
                <form className="nav__form" onSubmit={event => {
                    event.preventDefault()
                    const query = event.target.query.value
                    const typeMedia = event.target.typeMedia.value
                    
                    onSubmit(query, typeMedia)
                 }}> 
                    <select name="typeMedia" className="input__select">
                        <option value ="movies">Movies</option>
                        <option value ="tv-shows">Tv Shows</option>
                    </select>
                    <input type="text" name="query" placeholder="Search..." className="input__search" defaultValue={query} />
                </form>
            </div>
}
