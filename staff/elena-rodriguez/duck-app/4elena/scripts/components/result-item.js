function ResultItem(container) {
    this.__container__ = container;
    container.classList.add('results__item');
}

ResultItem.prototype.onClick = undefined;

ResultItem.prototype.render = function (result) {
    var item = document.createElement('a');
    item.classList.add('item');

    item.addEventListener('click', function () {
        var id = result.id;

        this.onClick(id);
    }.bind(this));

    var title = document.createElement('h2');
    title.classList.add('duck-list__title');
    title.innerText = result.title;

    var image = document.createElement('img');
    image.classList.add('duck-list__image');
    image.src = result.imageUrl;

    var price = document.createElement('span');
    price.classList.add('duck-list__price');
    price.innerText = result.price;

    item.append(title, image, price);

    this.__container__.append(item);
};