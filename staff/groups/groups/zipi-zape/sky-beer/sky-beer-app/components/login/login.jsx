function Login () {

    return <>
        <section className="login">
                <section className="sign-in">
                    <h2 className="login__title">Sign In</h2>
                    <form className="sign-in__form">
                        <label for="username">Username: <input type="email" className="sign-in__name" name="username" placeholder="Enter your email"/></label>
                        <label for="password">Password: <input type="password" className="sign-in__name" name="password"/></label>
                        <a href="#" className="link">Forgot your password?</a>
                        <button className="sign-in__button">Sign In</button>
                    </form>
                </section>
                <section className="sign-up">
                    <h2 className="login__title">Create a new account</h2>
                    <p className="sign-up__text">Register and create an account to manage your favourite beers and keep in contact with your beer-friends!</p>
                    <form className="sign-up__form">
                        <label for="name">Name: <input type="text" className="sign-up__name" name="name"/></label>
                        <label for="surname">Surname: <input type="text" className="sign-up__name" name="surname"/></label>
                        <label for="username">Username: <input type="email" className="sign-up__name" name="username" placeholder="Enter your email"/></label>
                        <label for="password">Password: <input type="password" className="sign-up__name" name="password"/></label>
                        <button className="sign-up__button">Sign Up</button>
                    </form>
                </section>
            </section>
    </>
}