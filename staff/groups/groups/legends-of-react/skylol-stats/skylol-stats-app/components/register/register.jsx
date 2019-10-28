function Register({ onRegister, onBack, error }) {
    return <section className="register">
        <form className="register__form" onSubmit={function (event) {
            event.preventDefault()

            const { name: { value: name }, surname: { value: surname }, summoner: {value : summoner}, email: { value: email }, password: { value: password } } = event.target

            onRegister(name, surname, summoner, email, password)
        }}>
            <h1 className="register__title">Register</h1>
            <input className="register__field" type="text" name="name" placeholder="name" />
            <input className="register__field" type="text" name="surname" placeholder="surname" />
            <input className="register__field" type="text" name="summoner" placeholder="summoner name" />
            <input className="register__field" type="email" name="email" placeholder="e-mail" />
            <input className="register__field" type="password" name="password" placeholder="password" />
            <button className="register__submit">Register</button>
            <button className="register__back" href="" onClick={event => {
                event.preventDefault()

                onBack()
            }}>Go back</button>
        </form>

        {error && <Feedback message={error} />}
    </section>
}