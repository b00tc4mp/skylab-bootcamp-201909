module.exports= function({item:{ id, title, image, price, isFav} , favPath, detailPath}){

    return `<li className="item-list__li"> 
    <a className="item-list__link" href="${`${detailPath}/${id}`}">    
        <h2 className="item-list__title">${title} </h2>
        <img src=${image} className="item-list__image"/>
        <p className="item-list__price">${price} </p>
        <span class="item-list__fav">
        <form method="post" action="${favPath}">
            <input type="hidden" name="id" value="${id}">
            <button type="submit">${isFav ? "https://image.flaticon.com/icons/svg/1469/1469575.svg" : "https://image.flaticon.com/icons/svg/1469/1469600.svg"}</button>
        </form>
    </span>
        </a>
    </li>
    `
}
