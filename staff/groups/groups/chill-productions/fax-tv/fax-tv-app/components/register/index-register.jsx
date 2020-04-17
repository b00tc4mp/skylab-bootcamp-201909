function Register({ onRegister, onLogin, error }) {
    return <section className="register">
        <form className="register__form" onSubmit={function (event) {
            event.preventDefault()

            const { name: { value: name }, surname: { value: surname }, email: { value: email }, password: { value: password } } = event.target

            onRegister(name, surname, email, password)
        }}>
            <input type="text" name="name" placeholder="Name" className="register__input name"/>
            <input type="text" name="surname" placeholder="Surname" className="register__input surname"/>
            <input type="email" name="email" placeholder="Email" className="register__input email"/>
            <input type="password" name="password" placeholder="Password" className="register__input password"/>
            <button className="register__btn btn-main">Register</button>
            <p className="register__or">or</p>
            <a className="register__btn" href="" onClick={event => {
                event.preventDefault()

                onLogin()
            }}>Log In</a>
        </form>

        {error && <Feedback message={error} />}
    </section>
}


