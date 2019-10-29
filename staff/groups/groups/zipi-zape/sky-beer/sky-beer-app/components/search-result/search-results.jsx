function SearchResults ({searchResults, onClickItem}) {
    return <ul className="search-results">
        { searchResults.map ((item) => 
            <ListItem onClick={onClickItem} key={item.id} item={item}/>)
        }
    </ul>

}