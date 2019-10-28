function SignIn ({onSubmit}){ 

    return <section className="sign-in">
                <h2 className="login__title">Sign In</h2>
                <form className="sign-in__form" onSubmit={event => {
                    event.preventDefault()

                    onSubmit()             
                    }}>
                    <label for="username">Username: <input type="email" className="sign-in__name" name="username" placeholder="Enter your email"/></label>
                    <label for="password">Password: <input type="password" className="sign-in__name" name="password"/></label>
                    <a href="#" className="link">Forgot your password?</a>
                    <button className="sign-in__button">Sign In</button>
                </form>
        </section>

}