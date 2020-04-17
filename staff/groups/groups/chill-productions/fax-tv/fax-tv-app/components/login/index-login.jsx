function Login({ onLogin, onRegister, error }) {
    return <section className="login">
        <form className="login__form" onSubmit={function (event) {
            event.preventDefault()

            const { email: { value: email }, password: { value: password } } = event.target 

            onLogin(email, password)
        }}>
            <input type="email" name="email" placeholder="Email" className="login__input email"/>
            <input type="password" name="password" placeholder="Password" className="login__input password"/>
            <button className="login__btn btn-main">Log In</button>
            <p className="login__or">or</p>
            <a className="login__btn" href="" onClick={event => {
                event.preventDefault()

                onRegister()
            }}>Register</a>
        </form>

        {error && <Feedback message={error} />}
    </section>
}
