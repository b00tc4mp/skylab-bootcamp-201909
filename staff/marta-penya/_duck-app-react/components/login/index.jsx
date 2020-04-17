function Login({ onLogin, onGoRegister, error }) {
    return <section className="view login _hide">
        <div className="login__div">
            <form className="login__form" onSubmit={ function (event){
                event.preventDefault()

                const { email: {value: email}, password: {value: password} } = event.target

                onLogin( email, password)
            }

            }>               
                <input type="text" name="email" placeholder="email" className="login__input" required/>
                <input type="password" name="password" placeholder="password" className="login__input" required/>
                <button className="login__button"> Login</button>        
             </form>
            <button className="login__goregistrer" onClick={ event => {
                event.preventDefault()

                onGoRegister()
            }

            }> Go to Register</button>
        </div>
         {error && <Feedback message={error}/>}  
        </section>
}

