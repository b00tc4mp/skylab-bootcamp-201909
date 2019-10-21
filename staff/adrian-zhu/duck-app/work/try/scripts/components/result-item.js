function ResultItem(container) {
    Component.call(this, container);
    //container.classList.add('results__item');
}

ResultItem.extend(Component);

ResultItem.prototype.onClick = undefined;

ResultItem.prototype.render = function (results) {
    var item = document.createElement('a');
    item.classList.add('item');

    var div = document.createElement('div');
    var link = document.createElement('a')
    var title = document.createElement('h3');
    var img = document.createElement('img');
    var price = document.createElement('p');
    
    link.addEventListener('click', function(e){
        this.onClick(results.id)}.bind(this));
        
    title.innerText = results.title;
    img.src = results.imageUrl;
    price.innerText = results.price;

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