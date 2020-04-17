function Champions({ champions, GoOnDetail, onFav, onClick }) {

    const list = champions.map((champ, i) =>
        < ChampionItem key={i.toString()} item={champ} onFav={onFav} onDetail={GoOnDetail}  />)
    return <>
        <div className="background"> </div>
        <ul className="tag">
            <li className="tag__selector" onClick={event => {
                event.preventDefault()
                const tag = document.getElementsByClassName('tag__selector')[0].innerHTML
                onClick(tag)
            }}>Mage</li>
            <li className="tag__selector" onClick={event => {
                event.preventDefault()
                const tag = document.getElementsByClassName('tag__selector')[1].innerHTML
                onClick(tag)
            }}>Tank</li>
            <li className="tag__selector" onClick={event => {
                event.preventDefault()
                const tag = document.getElementsByClassName('tag__selector')[2].innerHTML
                onClick(tag)
            }}>Fighter</li>
            <li className="tag__selector" onClick={event => {
                event.preventDefault()
                const tag = document.getElementsByClassName('tag__selector')[3].innerHTML
                onClick(tag)
            }}>Assassin</li>
            <li className="tag__selector" onClick={event => {
                event.preventDefault()
                const tag = document.getElementsByClassName('tag__selector')[4].innerHTML
                onClick(tag)
            }}>Support</li>
            <li className="tag__selector" onClick={event => {
                event.preventDefault()
                const tag = document.getElementsByClassName('tag__selector')[5].innerHTML
                onClick(tag)
            }}>Marksman</li>
        </ul>
        <ul className="champion">{list}

        </ul>
    </>
}





