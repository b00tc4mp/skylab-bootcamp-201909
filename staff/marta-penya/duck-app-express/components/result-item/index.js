module.exports= function({item:{ id, title, image, price, isFav} , favPath, detailPath}){

    return `<li class="item-list__li"> 
    <a class="item-list__link" href="${`${detailPath}/${id}`}">    
        <h2 class="item-list__title">${title} </h2>
        <img src=${image} class="item-list__image"/>
        <p class="item-list__price">${price} </p>
        <span >
        <form method="post" action="${favPath}">
            <input type="hidden" name="id" value="${id}">
            <button class="item-list__buttonfav" type="submit"> <img class="item-list__fav" src= ${isFav ? 'https://image.flaticon.com/icons/svg/1469/1469575.svg' : 'https://image.flaticon.com/icons/svg/1469/1469600.svg'} alt="fav" />
            </button>
        </form>
    </span>
        </a>
    </li>
    `
}
