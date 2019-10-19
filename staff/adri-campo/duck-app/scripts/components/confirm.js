function Confirm(container) {
    Component.call(this, container);
}

Confirm.extend(Component);

Confirm.prototype.onSubmit = function (expression) {
    this.__container__.addEventListener('submit', function (event) {
        event.preventDefault();

        document.getElementsByClassName("login")[0].classList.remove('hidden'); 
        document.getElementsByClassName("main__initial")[0].classList.add('hidden');
        document.getElementsByClassName("nav__search")[0].classList.add('hidden');
        document.getElementsByClassName("footer__button")[0].classList.add('hidden');
        document.getElementsByClassName("registration")[0].classList.add('hidden');
    });
};
