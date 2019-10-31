function Login ({logged, name, onLogin, onRegister, onLogout, error}) {

    return <>
        <section className="login">
                {!logged && <SignIn onSubmit={onLogin} /*error={error}*/ /> || <><h1 className="login__hello-username">Hello {name}!</h1><h2 className="login__user-logout"><a href="#" onClick={event=>{
                    event.preventDefault()
                    onLogout()
                }}>Want to LOG OUT?</a></h2></>}
                <SignUp onSubmit={onRegister} /*error={error}*/ />
        {error && <Feedback message={error} />}
        </section>
    </>
}