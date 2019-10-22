function Login({ onLogin }) {
    return <section className="view login _hide">
        <form onSubmit={function (event) {
            event.preventDefault()

            const { email: { value : email },
            password: { value : password } } = event.target

            onLogin(email, password)
        }}>
            <h1 className="login__title">Login</h1>
            <input className="login__field" type="email" name="email" placeholder="e-mail" />
            <input className="login__field" type="password" name="password" placeholder="password" />
            <button className="login__submit">🗝</button>
            <a className="login__back" href="">Go Back</a>
        </form> 
        <section className="feedback hide">
            <span className="feedback__icon">⚠️⚠️</span>
            <p className="feedback__message">Something went wrong...</p>
            <span className="feedback__icon">⚠️⚠️</span>
        </section>
    </section>
}