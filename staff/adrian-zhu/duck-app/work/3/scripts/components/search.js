function Search(container) {
    this.__container__ = container; 
}

Search.prototype.onSubmit = function (expression) {
    this.__container__.addEventListener('submit', function (event) {
        event.preventDefault()
        
        var duckQuery = document.getElementsByClassName('uploaded__input')[0];
        var url = duckQuery.value;
        expression(url);
    });
};