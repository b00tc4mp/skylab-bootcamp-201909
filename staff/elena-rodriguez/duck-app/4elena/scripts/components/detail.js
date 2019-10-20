function Detail(container) {
    this.__container__ = container;
}

Detail.prototype.onBack = undefined;

Detail.prototype.render = function (item) {
    const title = document.getElementsByClassName("detail__title")[0];
    title.innerText = item.title;

    const image = document.getElementsByClassName("detail__image")[0];
    image.src = item.imageUrl;
    
    const description = document.getElementsByClassName("detail__description")[0];
    description.innerText = item.description;

    const price = document.getElementsByClassName("detail__price")[0];
    price.innerText = item.price;

    const store = document.getElementsByClassName("detail__store")[0];
    store.href = item.link;

    const back = document.getElementsByClassName("detail__button")[0];
    back.addEventListener('click', this.onBack);
}


// back.addEventListener('click' , function (event) {
//     var views = document.getElementsByClassName('main')[0];
//     views.children[0].classList.remove('hide');
//     views.children[1].classList.add('hide');