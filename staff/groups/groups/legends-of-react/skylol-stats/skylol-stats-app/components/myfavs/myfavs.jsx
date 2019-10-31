function Myfavs ({favs, onFav, GoOnDetail}) {
    debugger
    const list = favs.map((fav, i) =>
        < ChampionItem key={i.toString()} item={fav[0]} onFav={onFav} onDetail={GoOnDetail}  />)
    return <ul className="champion">
        {list}
    </ul>
}
