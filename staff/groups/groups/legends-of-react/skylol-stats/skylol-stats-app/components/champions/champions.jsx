function Champions({  champions }) {
    
    const list = champions.map((champ, i) => 
        < ChampionItem key={i.toString()} item={champ} />)
    return <> 
    <div className="background"> </div>
    <ul className="champion">{list}
           
    </ul>
    </>
}


 