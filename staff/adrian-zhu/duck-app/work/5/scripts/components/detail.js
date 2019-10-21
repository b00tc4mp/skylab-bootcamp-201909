function Detail(container) {
    Component.call(this, container);
}

Detail.extend(Component);

Detail.prototype.onBack = undefined;

Detail.prototype.render = function (duck) {
    var title = this.__container__.getElementsByClassName('details__title')[0];
    title.innerText = duck.title;

    var image = this.__container__.getElementsByClassName('details__image')[0];
    image.src = duck.imageUrl;

    var description = this.__container__.getElementsByClassName('details__description')[0];
    description.innerText = duck.description;

    var store = this.__container__.getElementsByClassName('details__combination-store')[0];
    store.href = duck.link;

    var price = this.__container__.getElementsByClassName('details__combination-price')[0];
    price.innerText = duck.price;

    var back = this.__container__.getElementsByClassName('details__combination-back')[0];
    back.addEventListener('click', this.onBack);
};