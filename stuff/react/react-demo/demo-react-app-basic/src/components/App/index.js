import React, { Component } from 'react';
import Register from '../Register';
import Login from '../Login';
import logic from '../../logic'

class App extends Component {
    constructor() {
        super()
        this.state = {
            view: 'register',
            user: undefined,
            credentials: undefined,
            error: undefined,
        }
    }

    async componentWillMount(){
        if(sessionStorage.token){
            try{
                // const user = await logic.retrieveUser()
                // this.setState({ user : user})
                this.setState({ user : await logic.retrieveUser()})
            }catch({ message }){
                this.setState({view : 'regsiter' , error: message})
            }
        }
    }

    handleGoToRegister = event => {
        event.preventDefault();
        this.setState({view: 'register' , error: undefined});
    }

    handleGoToLogin = event => {
        event.preventDefault();
        this.setState({view: 'login' , error: undefined});
    }

    handleRegister = async event => {
        event.preventDefault()
        const { target : { username : { value : username } , email : { value : email } , password : { value : password } , repassword : { value : repassword } }} = event
        try{
            await logic.registerUser(username , email , password , repassword)
            this.setState({view:'login'})
        }
        catch({ message }){
            this.setState({error :message})
        }
    }

    handleLogin = async event => {
        event.preventDefault()
        const { target : { email : { value : email } , password : { value : password } }} = event
        try{
            const {token} = await logic.authenticateUser(email , password)
            logic.__token__ = token;
            this.setState({view:'login'})
        }
        catch({ message }){
            this.setState({error :message})
        }
    }

    render() {
        const {
            state: {view, user, error},
            handleRegister, handleLogin, handleGoToLogin, handleGoToRegister
        } = this
        
        return  <div className="App">
                    {view==='register' && <Register onError={error} onGoToLogin={handleGoToLogin} onSubmit={handleRegister}/>}
                    {view==='login' && <Login onError={error} onBack={handleGoToRegister} onSubmit={handleLogin}/>}
                </div>
    }
}

export default App;