function Login ({onLogin, onRegister, /*error*/}) {

    return <>
        <section className="login">
                <SignIn onSubmit={onLogin} /*error={error}*/ />
                <SignUp onSubmit={onRegister} /*error={error}*/ />
        </section>
    </>
}