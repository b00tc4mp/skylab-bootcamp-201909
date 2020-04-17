function Register({ onRegister, onGoLogin, error }) {
    return <section className="view register _hide">
        <div className="register__div">
    <form className="register__form" onSubmit={ function (event){
        event.preventDefault()

        const { name: {value: name}, surname: {value: surname}, email: {value: email}, password: {value: password}} = event.target
        
        onRegister(name, surname, email, password)
    }

    }>
        <input type="text" name="name" placeholder="name" className="register__input" autoFocus required/>
        <input type="text" name="surname" placeholder="surname" className="register__input" required/>               
        <input type="email" name="email" placeholder="email" className="register__input" required/>
        <input type="password" name="password" placeholder="password" className="register__input" required/>
        <button className="register__button"> Register</button>
            
    </form>
    <button className="register__gologin" onClick={ event => {
                event.preventDefault()

                onGoLogin()
            }
            }> Go to Login</button>
</div>
       {error && <Feedback message={error}/>}     
    </section>
}

