function ResultItem(container) {
    this.__container__ = container;
    //container.classList.add('results__item');
}

ResultItem.prototype.onClick = function(duck) {console.log('clicked', duck)};

ResultItem.prototype.render = function (duck) {
    var item = document.createElement('a');
    item.classList.add('item');

    var div = document.createElement('div');
    var link = document.createElement('a')
    var title = document.createElement('h3');
    var img = document.createElement('img');
    var price = document.createElement('p');
    
    link.addEventListener('click', function(e){
        searchDetailDuck(duck.id, this.onClick)}.bind(this));
        
    title.innerText = duck.title;
    img.src = duck.imageUrl;
    price.innerText = duck.price;

    // results.classList.add = 
    // div.classList.add = 
    // link.classList.add = 
    // title.classList.add = z
    // img.classList.add = 
    // price.classList.add = 

    link.append(title, img, price);
    div.append(link)

    this.__container__.append(div); // li apapend div
};