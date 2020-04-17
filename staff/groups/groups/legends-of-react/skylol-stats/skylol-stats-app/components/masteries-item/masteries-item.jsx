function MasteriesItem({item}){
    return <li className="mastery__content">
        <p className="mastery__name">{item.name}</p>
        <div className="mastery__container">
            <img className="mastery__image"
                src={item.icon} alt=""/>
            <p className="mastery__points">{item.points}</p>
        </div>
    </li>
}