const Feedback = require('../feedback')

module.exports = function( { name } ){
    return `<section class="view search">
        <h2>Hello ${name} </h2>
    <form class="search__form">               
        <input type="search" name="query" id="search__formitem" class="search__input"/>
        <button class="search__button">🔎 Search</button>
    </form>
    ${Feedback()}
</section>`
}


/* <section>
<ul class="item-list">
    <li class="item-list__item">
        <a href="#" class="item-list__link">
            <h2 class="item-list__title">This is a Super Duuuuuuuck</h2>
            <img class="item-list__image" src="https://fakeimg.pl/300x200/?text=Hello">
            <span class="item-list__price">10€</span>
            <img class="item-list__fav" src="https://image.flaticon.com/icons/svg/1469/1469600.svg">
        </a>
    </li>
    <li class="item-list__item">
        <a href="#" class="item-list__link">
            <h2 class="item-list__title">Duck X</h2>
            <img class="item-list__image" src="https://fakeimg.pl/300x200/?text=Hello">
            <span class="item-list__price">10€</span>
            <img class="item-list__fav" src="https://image.flaticon.com/icons/svg/1469/1469575.svg">
        </a>
    </li>
    <li class="item-list__item">
        <a href="#" class="item-list__link">
            <h2 class="item-list__title">Duck X</h2>
            <img class="item-list__image" src="https://fakeimg.pl/300x200/?text=Hello">
            <span class="item-list__price">10€</span>
            <img class="item-list__fav" src="https://image.flaticon.com/icons/svg/1469/1469575.svg">
        </a>
    </li>
    <li class="item-list__item">
        <a href="#" class="item-list__link">
            <h2 class="item-list__title">Duck X</h2>
            <img class="item-list__image" src="https://fakeimg.pl/300x200/?text=Hello">
            <span class="item-list__price">10€</span>
            <img class="item-list__fav" src="https://image.flaticon.com/icons/svg/1469/1469575.svg">
        </a>
    </li>
    <li class="item-list__item">
        <a href="#" class="item-list__link">
            <h2 class="item-list__title">Duck X</h2>
            <img class="item-list__image" src="https://fakeimg.pl/300x200/?text=Hello">
            <span class="item-list__price">10€</span>
            <img class="item-list__fav" src="https://image.flaticon.com/icons/svg/1469/1469575.svg">
        </a>
    </li>
    <li class="item-list__item">
        <a href="#" class="item-list__link">
            <h2 class="item-list__title">Duck X</h2>
            <img class="item-list__image" src="https://fakeimg.pl/300x200/?text=Hello">
            <span class="item-list__price">10€</span>
            <img class="item-list__fav" src="https://image.flaticon.com/icons/svg/1469/1469575.svg">
        </a>
    </li>
    <li class="item-list__item">
        <a href="#" class="item-list__link">
            <h2 class="item-list__title">Duck X</h2>
            <img class="item-list__image" src="https://fakeimg.pl/300x200/?text=Hello">
            <span class="item-list__price">10€</span>
            <img class="item-list__fav" src="https://image.flaticon.com/icons/svg/1469/1469575.svg">
        </a>
    </li>
</ul>
</section>  */