function Champions({  champions, GoOnDetail }) {
    
    const list = champions.map((champ, i) => 
        < ChampionItem key={i.toString()} item={champ} onDetail={GoOnDetail} />)
    return <> 
    <div className="background"> </div>
    <ul className="champion">{list}
           
    </ul>
    </>
}


 