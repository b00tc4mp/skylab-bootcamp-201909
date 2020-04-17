function Results(container) {
    Component.call(this, container)
    container.innerHTML = ''
}

Results.extend(Component)

Results.prototype.onItemClick = function(duck) { console.log('clicked on duck', duck) }

Results.prototype.render = function(ducks) {
    this.__container__.innerHTML = ''
   
    ducks.forEach(function (duck) {
        var result = new ResultItem(document.createElement('li'))
        result.onClick = this.onItemClick
        result.render(duck)

        this.__container__.append(result.__container__)
    }.bind(this))

};
