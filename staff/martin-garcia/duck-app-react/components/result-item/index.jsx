function ResultItem({ item: { id, title, image, price },onCLick}) {
    return  <article className="main__article">
                <a className="item">
                    <p className="article__title">{title}</p>
                    <img className="article__image" src={image}/>
                    <p className="article__price">{price}</p>
                </a>
            </article>
}