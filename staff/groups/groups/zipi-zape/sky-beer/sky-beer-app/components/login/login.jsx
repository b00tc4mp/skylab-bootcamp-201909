function Login ({onLogin, onRegister}) {

    return <>
        <section className="login">
                <SignIn onSubmit={onLogin} />
                <SignUp onSubmit={onRegister}/>
        </section>
    </>
}