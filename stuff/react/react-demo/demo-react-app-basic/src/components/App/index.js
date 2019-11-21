import React, { Component } from 'react';

// COMPONENTS
import Register from '../Register';
import Login from '../Login';
import Aside from '../Aside';
import Item from '../Item';
import Main from '../Main';
import Home from '../Home';
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
        console.log(this.state.idCategory)
        if (sessionStorage.token) {
            try {
                const user = await logic.retrieveUser()
                this.setState({ user : user })
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
            this.setState({ user : await logic.retrieveUser()})
            this.handleCategory()
        }
        catch ({ message }) {
            this.setState({ error: message })
        }
    }

    handleCategory = async () => {
        try {
            
            const categories = await logic.retrieveCategory()
            if(categories.length > 0){
                const [{id}] = categories
                this.handleTasksCategory(id)
                this.setState({idCategory: id})
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

    handleRegisterTask = async (event, idCategory) => {
        const { task: { value: task } } = event.target
        
        await logic.registerTask(idCategory, task)
        this.handleTasksCategory(idCategory)
    }

    handleDeleteTask = async taskId =>{
        await logic.deleteTask(this.state.idCategory, taskId)
        this.handleTasksCategory(this.state.idCategory)
    }

    handleRegisterCategory = async event => {
        const { category: { value: name }} = event.target
        await logic.registerCategory(name)
        this.handleCategory()

    }

    handleDeleteCategory = async idCategory =>{debugger
        await logic.deleteCategory(idCategory)

        this.handleCategory()
    }

    render() {
        const {
            state: { view, error, categories, tasks, user, idCategory },
            handleRegister, handleLogin, handleGoToLogin, handleGoToRegister,
            handleTasksCategory, handleRegisterTask, handleDeleteTask, handleRegisterCategory, handleDeleteCategory
        } = this

        return <div className="App">
            {view === 'register' && <Register onError={error} onGoToLogin={handleGoToLogin} onSubmit={handleRegister} />}
            {view === 'login' && <Login onError={error} onBack={handleGoToRegister} onSubmit={handleLogin} />}
            {view === 'home' && <Home aside={<Aside currentUser={user} onRegisterCategory={handleRegisterCategory} categories={categories} onItem={category => <Item category={category} onExtend={handleTasksCategory} onDeleteCategory={handleDeleteCategory} on />} />} main={<Main tasks={tasks} id={idCategory} onRegisterTask={handleRegisterTask} onDeleteTask = {handleDeleteTask}/>} />}
        </div>
    }
}