function ResultItem(container) {
    Component.call(this, container);
    container.classList.add('results__item');
}

ResultItem.extend(Component);
// ResultItem.prototype.onClick = undefined;

ResultItem.prototype.render = function (duck) {
    var item = newElement('a','duck');
    item.href = "#";
    item.dataset.duckId = duck.id
    var title = newElement('h2','duck__title',duck.title);

    var image = newElement('img','duck__img');
    image.src = duck.imageUrl;

    var price = newElement('p','duck__price');
    var priceTag = newElement('span','price-tag',duck.price);
    price.append(priceTag);
    item.append(title, image, price);

    this.container.append(item); 
};