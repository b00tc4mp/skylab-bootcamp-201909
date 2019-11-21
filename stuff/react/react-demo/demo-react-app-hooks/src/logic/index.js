import deleteTask from './delete-task'
import registerTask from './register-task'
import updateTask from './update-task'
import registerUser from './register-user'
import authenticateUser from './authenticate-user'
import retrieveUser from './retrieve-user'
import retrieveAllTasks from './retrieve-all-tasks'
import isUserLoggedIn from './is-user-logged-in'
import userLoggedOut from './user-logged-out'
import retrieveCategory from './retrieve-category'
import retrieveTaskByCategory from './retrieve-all-task-category'
import registerCategory from './register-category'
import deleteCategory from './delete-category'

export default {
    set __token__(token){
        sessionStorage.token = token
    },
    
    get __token__(){
        return sessionStorage.token 
    },
    
    isUserLoggedIn , userLoggedOut ,
    registerTask , deleteTask , updateTask ,
    registerUser , authenticateUser , retrieveUser ,
    retrieveAllTasks, retrieveCategory, retrieveTaskByCategory, registerCategory, deleteCategory
}

      
      