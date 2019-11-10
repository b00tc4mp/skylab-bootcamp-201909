const Feedback = require('../feedback')

module.exports = function({ duck: { id, title, imageUrl, price, description, link, isFav }, favPath, error }){

    return   `<div class="view detail">
    <section class = "result view">
        <div class="detail-list">
            <h2 class="detail-list__title" >${title}</h2>
            <img class="detail-list__image" src=${imageUrl}/>
            <p class="detail-list__description">${description}</p>
            <a href=${link} class="detail-list__store">Go to Store</a>
            <p class="detail-list__price">${price}</p>
            <button class="detail-list__button">Back</button>
            <span >
            <form method="post" action="${favPath}">
                <input type="hidden" name="id" value="${id}">
                <button class="item-list__buttonfav" type="submit"> <img class="item-list__fav" src= ${isFav ? 'https://image.flaticon.com/icons/svg/1469/1469575.svg' : 'https://image.flaticon.com/icons/svg/1469/1469600.svg'} alt="fav" />
                </button>
            </form>
            </span>           
        </div>
    </section>
    ${error ? Feedback({ message: error}) : ''}
</div>`
}