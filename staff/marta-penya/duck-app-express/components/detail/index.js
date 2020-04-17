const Feedback = require('../feedback')

module.exports = function( {item, favPath, backPath}){
    return   `<div class="view detail">
    <section class = "result view">
        <div class ="detail-list">
            <h2 class="detail-list__title" >${item.title}</h2>
            <img class="detail-list__image" src="${item.image}"/>
            <p class="detail-list__description">${item.description}</p>
            <a href=${item.link} class="detail-list__store">Go to Store</a>
            <p class="detail-list__price">${item.price}</p>
            <a class="detail-list__button" href="${backPath}">Go back</a>
            <span >
            <form method="post" action="${favPath}">
                <input type="hidden" name="id" value="${item.id}">
                <button class="item-list__buttonfav" type="submit"> <img class="item-list__fav" src= ${item.isFav ? 'https://image.flaticon.com/icons/svg/1469/1469575.svg' : 'https://image.flaticon.com/icons/svg/1469/1469600.svg'} alt="fav" />
                </button>
            </form>
            </span>           
        </div>
    </section>

</div>`
}

