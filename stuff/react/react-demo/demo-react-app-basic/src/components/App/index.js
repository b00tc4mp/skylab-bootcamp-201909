import React, { Component } from 'react';

// COMPONENTS
import Register from '../Register';
import Login from '../Login';
import Home from '../Home'
import Item from '../Item'
import Task from '../Task'

// LOGIC
import logic from '../../logic'

export default class App extends Component {
    constructor() {
        super()
        this.state = {
            view: 'register',
            credentials: undefined,
            error: undefined,
            categories: undefined
        }
    }

    async componentWillMount() {
        if (sessionStorage.token) {
            try {
                // const user = await logic.retrieveUser()
                // this.setState({ user : user})
                this.setState({ user: await logic.retrieveUser() })
            } catch ({ message }) {
                this.setState({ view: 'regsiter', error: message })
            }
        }
    }

    handleGoToRegister = event => {
        event.preventDefault();
        this.setState({ view: 'register', error: undefined });
    }

    handleGoToLogin = event => {
        event.preventDefault();
        this.setState({ view: 'login', error: undefined });
    }

    handleRegister = async event => {
        event.preventDefault()
        const { target: { username: { value: username }, email: { value: email }, password: { value: password }, repassword: { value: repassword } } } = event
        try {
            await logic.registerUser(username, email, password, repassword)
            this.setState({ view: 'login' })
        }
        catch ({ message }) {
            this.setState({ error: message })
        }
    }

    handleLogin = async event => {
        event.preventDefault()
        const { target: { email: { value: email }, password: { value: password } } } = event
        try {
            await logic.authenticateUser(email, password)
            debugger
            this.handleCategory()
        }
        catch ({ message }) {
            this.setState({ error: message })
        }
    }

    handleCategory = async () => {
        try {
            const categories = await logic.retrieveCategory()
            this.setState({ view: 'home', categories })
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    handleTasksCategory = async (id) => {
        try{
            const tasks =  await logic.retrieveTaskByCategory(id)
            this.setState({ tasks })
        }catch({message}){
            this.setState({ error: message })
        }
    }

    render() {
        const {
            state: { view, error, categories, tasks },
            handleRegister, handleLogin, handleGoToLogin, handleGoToRegister, handleTasksCategory
        } = this

        return <div className="App">
            {view === 'register' && <Register onError={error} onGoToLogin={handleGoToLogin} onSubmit={handleRegister} />}
            {view === 'login' && <Login onError={error} onBack={handleGoToRegister} onSubmit={handleLogin} />}
            {view === 'home' && <Home categories={categories} onItem={category => <Item category={category} onExtend={handleTasksCategory}/>} />&&<Task tasks={tasks} />}
        </div>
    }
}