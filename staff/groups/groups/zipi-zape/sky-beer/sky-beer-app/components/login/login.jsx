function Login ({logged, name, onLogin, onRegister, onLogout, error}) {

    return <>
        <section className="login">
                {!logged && <SignIn onSubmit={onLogin} /*error={error}*/ /> || <><h1>Hello {name}!</h1><a href="#" onClick={event=>{
                    event.preventDefault()
                    onLogout()
                }}>Want to LOG OUT?</a></>}
                <SignUp onSubmit={onRegister} /*error={error}*/ />
        {error && <Feedback message={error} />}
        </section>
    </>
}