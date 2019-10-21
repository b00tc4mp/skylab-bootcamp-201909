debugger
function Login(container) {
    Component.call(this, container);
}

Login.extend(Component);

Login.prototype.onSubmit = function(expression) {
    this.container.addEventListener('submit', function(event){
        event.preventDefault();

            var username = this.username.value;
            var password = this.password.value;

        expression(username, password);
    })
}

