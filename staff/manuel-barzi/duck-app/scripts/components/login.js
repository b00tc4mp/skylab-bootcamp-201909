function Login(container){
    Component.call(this, container);
}
Login.extend(Component);

// lo mismo que search pero escoger email y password 

Login.prototype.onSubmit = function (expression) {
    this.container.addEventListener('submit', function (event) {
        event.preventDefault()
        const email = this.email.value
        const password = this.password.value
        expression(email, password) 
        // document.getElementsByClassName('login')[0].classList.add('hidden')
        // document.getElementsByClassName('main')[0].classList.remove('hidden')
        
    });
};