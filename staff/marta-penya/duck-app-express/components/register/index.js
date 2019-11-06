const Feedback = require('../feedback')

module.exports = function(){
    return `<section class="view register">
        <div class="register__div">
            <form class="register__form" method="post" action="/register">
                <input type="text" name="name" placeholder="name" class="register__input" autoFocus required/>
                <input type="text" name="surname" placeholder="surname" class="register__input" required/>               
                <input type="email" name="email" placeholder="email" class="register__input" required/>
                <input type="password" name="password" placeholder="password" class="register__input" required/>
                <button class="register__button"> Register</button>            
            </form>
            <button class="register__gologin"> Go to Login</button>
        </div>
    ${Feedback()}
    </section>`
}

