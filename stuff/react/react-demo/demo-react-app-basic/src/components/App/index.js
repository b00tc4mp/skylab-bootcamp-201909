import React, { Component } from 'react';
import Register from '../Register';
import logic from '../../logic'

class App extends Component {
    constructor() {
        super()
        this.state = {
            view: 'register',
            user: undefined,
            error: undefined,
        }
    }

    handleSubmit = async event => {
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

    render() {
        const {
            state: {view, user, error},
            handleSubmit
        } = this
        
        return  <div className="App">
                    {view==='register' && <Register onError={error} onSubmit={handleSubmit}/>}
                </div>
    }
}

export default App;