function Login(container) {
    Component.call(this, container);
}

Login.extend(Component);

Login.prototype.onSubmit = function (expression) {
    this.__container__.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = this.username.value
        const password = this.password.value
        
        expression(username, password)

    });
};
