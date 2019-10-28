function championItem({item: { id, title, image, }, onClick }){
    return  <a className="champion__ancore" href="#">
    <li className="champion__content">
        <p className="champion__name">Lux</p>
        <div className="champion__container">
            <div className="champion__info">
                <p>assassin</p>
                <p>tank</p>
            </div>
            <img className="champion__image"
                src="https://ddragon.leagueoflegends.com/cdn/9.13.1/img/champion/Lux.png" alt=""/>
        </div>
    </li>
</a>
}