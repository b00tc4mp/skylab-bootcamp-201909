function SearchResults ({searchResults, onClickItem, onClose}) {
    return <> <i className="close fas fa-times" onClick={e=>{
        e.preventDefault()
        onClose()
    } }></i>
        <ul className="search-results"> 
        { searchResults.map ((item) => 
            <ListItem onClick={onClickItem} key={item.id} item={item}/>)
        }
    </ul>
</>
}