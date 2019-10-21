function Detail(container) {
    Component.call(this, container)
}

Detail.extend(Component)

Detail.prototype.render = function (duck) {
    var detail = document.getElementsByClassName("details")[0]
    detail.getElementsByClassName("details__title")[0].innerText = duck.title
    detail.getElementsByClassName("pricetag")[0].innerText = duck.price
    detail.getElementsByClassName("details__img")[0].src = duck.imageUrl
    detail.getElementsByClassName("details__description")[0].innerText = duck.description

    document.getElementsByClassName("main__initial")[0].classList.add('hidden') 
    document.getElementsByClassName("main__details")[0].classList.remove('hidden') 
    
};