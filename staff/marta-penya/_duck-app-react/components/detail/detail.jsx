function Detail({ item: { id, title, imageUrl, price, description, link, isFav }, onBack}){

    return   <div className="view detail">
    <section className = "result view">
        <div className="detail-list">
            <h2 className="detail-list__title" >{title}</h2>
            <img className="detail-list__image" src={imageUrl}/>
            <p className="detail-list__description">{description}</p>
            <a href={link} className="detail-list__store">Go to Store</a>
            <p className="detail-list__price">{price}</p>
            <button className="detail-list__button" onClick={ event => {
                    event.preventDefault()

                    onBack()
                }
            }>Back</button>
            <img className="item-list__fav" src={isFav ? "https://image.flaticon.com/icons/svg/1469/1469575.svg" : "https://image.flaticon.com/icons/svg/1469/1469600.svg"} onClick={event => {
                event.preventDefault()
                event.stopPropagation()                

                onFav(id)
            }}/>
        </div>
    </section>
</div>
}