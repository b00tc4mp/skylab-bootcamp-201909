function Loginform(container) {
    this.__container__ = container;
}

Loginform.prototype.render = function (duck) {
    var loginform = this.__container__.getElementsByClassName('loginform')[1];
    loginform.innerText = duck.loginform;

    var input = this.__container__.getElementsByClassName('loginform__input')[1];
    input.innerText = duck.input;

    var label = this.__container__.getElementsByClassName('loginform__label')[1];
    label.innerText = duck.label;

    var back = this.__container__.getElementsByClassName('loginform__back')[1];
    back.addEventListener('click', function (event) {
        var views = document.getElementsByClassName('view');

        views[0].classList.remove('hide');
        views[1].classList.add('hide');
    });
};

