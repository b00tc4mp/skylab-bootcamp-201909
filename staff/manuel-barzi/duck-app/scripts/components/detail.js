function Detail(container){
    Component.call(this, container);
    this.render = this.render.bind(this); 
}
Detail.extend(Component);
// Detail.prototype.onBack = undefined;

Detail.prototype.render = function (duck) {
    this.container.getElementsByClassName('details__title')[0].innerText = duck.title;
    this.container.getElementsByClassName('details__img')[0].src = duck.imageUrl;
    this.container.getElementsByClassName('details__description')[0].innerText = duck.description;
    this.container.getElementsByClassName('details__price-tag')[0].innerText = duck.price;
    // var back = this.container.getElementsByClassName('detail__back')[0];
    // back.addEventListener('click', this.onBack);
};