function Myfavs({ favs, onFav, GoOnDetail }) {
    debugger
    const list = favs.map((fav, i) =>
        < FavItem key={i.toString()} item={fav[0]} onFav={onFav} onDetail={GoOnDetail} />)
    return <section>
        <div className="background"> </div>
        <h2 className="title">Favourite Champions</h2>
        <ul className="favs">
            {list}
        </ul>
    </section>

}
