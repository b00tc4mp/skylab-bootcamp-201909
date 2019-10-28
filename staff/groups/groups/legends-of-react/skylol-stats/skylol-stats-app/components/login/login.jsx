function Login({ onLogin, error }) {


    return  <section className="login">
    <form className="login__form" onSubmit={function (event) {
            event.preventDefault()

            const { email: { value: email }, password: { value: password } } = event.target

            onLogin(email, password)
        }}>
        <h2 className="login__title">Login</h2>
        <input type="email" className="login__field" name="email" placeholder="@"/>
        <input type="password" className="login__field" name="password" placeholder="password"/>
        <button className="login__submit"> Login </button>
    </form>
   
        {error && <Feedback message={error} />}
    </section>
}




/* <section className="login">
        <form className="login__form" onSubmit={function (event) {
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
    </section> */