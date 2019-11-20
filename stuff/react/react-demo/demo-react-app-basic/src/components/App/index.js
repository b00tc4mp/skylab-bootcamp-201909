import React, { Component } from 'react';

// COMPONENTS
import Register from '../Register';
import Login from '../Login';
import Aside from '../Aside';
import Item from '../Item';
import Main from '../Main';
import Home from '../Home'
// LOGIC
import logic from '../../logic'

export default class App extends Component {
    constructor() {
        super()
        this.state = {
            view: 'register',
            credentials: undefined,
            error: undefined,
            categories: undefined,
            user: undefined,
            tasks: [],
            idCategory: undefined
        }
    }

    async componentWillMount() {
        if (sessionStorage.token) {
            try {
                const user = await logic.retrieveUser()
                this.setState({ user : user})
            } catch ({ message }) {
                this.setState({ view: 'register', error: message })
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
            await this.handleCategory()
        }
        catch ({ message }) {
            this.setState({ error: message })
        }
    }

    handleCategory = async () => {
        try {
            debugger
            const categories = await logic.retrieveCategory()
            if(categories.length > 0){
                const [{id}] = categories
                this.handleTasksCategory(id)
            }
            this.setState({ view: 'home', categories })
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    handleTasksCategory = async (idCategory) => {
        try {
            const tasks = await logic.retrieveTaskByCategory(idCategory)
            this.setState({ tasks, idCategory })
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    render() {
        const {
            state: { view, error, categories, tasks, user, idCategory },
            handleRegister, handleLogin, handleGoToLogin, handleGoToRegister, handleTasksCategory
        } = this

        return <div className="App">
            {view === 'register' && <Register onError={error} onGoToLogin={handleGoToLogin} onSubmit={handleRegister} />}
            {view === 'login' && <Login onError={error} onBack={handleGoToRegister} onSubmit={handleLogin} />}
            {view === 'home' && <Home aside={<Aside currentUser={user} categories={categories} onItem={category => <Item category={category} onExtend={handleTasksCategory} />} />} main={<Main tasks={tasks} id={idCategory} />} />}
        </div>
    }
}