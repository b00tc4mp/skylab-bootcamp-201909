function Login(container) {
    this.__container__ = container;
 
};

Login.prototype.onSubmit = function (expression) {
    this.__container__.addEventListener('submit', function (event) {
        event.preventDefault();

        document.getElementsByClassName("main__loginForm")[0].classList.add('hidden'); 
        document.getElementsByClassName("main__initial")[0].classList.remove('hidden');
        document.getElementsByClassName("nav__search")[0].classList.remove('hidden');

    });
};