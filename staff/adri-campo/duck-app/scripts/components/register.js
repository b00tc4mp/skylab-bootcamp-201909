function Register(container) {
    Component.call(this, container);
}

Register.extend(Component);

Register.prototype.onSubmit = function (expression) {
    this.container.addEventListener('submit', function (event) {
        event.preventDefault();

        document.getElementsByClassName("login")[0].classList.remove('hidden'); 
        document.getElementsByClassName("registration")[0].classList.add('hidden');
        
    });
};  