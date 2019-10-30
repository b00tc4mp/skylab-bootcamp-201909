function Masteries({ masteries}) {
    
    const list = masteries.map((champ, i) => 
        < masteries-item key={i.toString()} item={champ} />)
    return <> 
    <div className="background"> </div>
    <ul className="mastery">{list}
           
    </ul>
    </>
}
