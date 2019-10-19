function Register(container) {
    Component.call(this, container);
}

Register.extend(Component);

Register.prototype.onSubmit = function (expression) {
    this.__container__.addEventListener('submit', function (event) {
        event.preventDefault();

        document.getElementsByClassName("login")[0].classList.add('hidden'); 
        document.getElementsByClassName("main__initial")[0].classList.add('hidden');
        document.getElementsByClassName("registration")[0].classList.add('hidden');
        
    });
};  