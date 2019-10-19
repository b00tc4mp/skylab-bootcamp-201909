function ResultItem(container) {
    Component.call(this, container);
    container.classList.add('duckinfo');
};

ResultItem.extend(Component);


ResultItem.prototype.onClick = function (duck) { console.log('clicked', duck) };

ResultItem.prototype.render = function (duck) {
    var link = document.createElement('a');
    link.classList.add('duckinfo__link');
    link.classList.add('gridduck');
    link.addEventListener('click', function() { duckPage(duck.id) })

    // var li = document.createElement('li');
    // li.classList.add('duckinfo__li')
    
    var img = document.createElement('img');
    img.classList.add("duckinfo__img");

    var h2 = document.createElement('h2');
    h2.classList.add("duckinfo__title");

    var p = document.createElement('p');
    p.classList.add("duckinfo__price");
    
    var span = document.createElement('span');
    span.classList.add('pricetag')
   
    h2.innerHTML = duck.title;
    span.innerHTML = duck.price;
    img.src = duck.imageUrl; 

    link.append(h2,p,img)
    p.append(span)

    this.__container__.append(link);
};