function Login({ onLogin, onBack, error }) {
    return <section className="login">
        <form onSubmit={function (event) {
            event.preventDefault()

            const { email: { value: email }, password: { value: password } } = event.target

            onLogin(email, password)
        }}>
            <h1 className="login__title">Login</h1>
            <input className="login__field" type="email" name="email" placeholder="e-mail" />
            <input className="login__field" type="password" name="password" placeholder="password" />
            <button className="login__submit">Login</button>
            <button className="login__back" href="" onClick={event => {
                event.preventDefault()

                onBack()
            }}>Go back</button>
        </form>

        {error && <Feedback message={error} />}
    </section>
}