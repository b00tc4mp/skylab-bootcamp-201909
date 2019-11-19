const { Router } = require('express')
const router = Router()

const bodyParser = require('body-parser')
const jsonBodyParser = bodyParser.json()

const tokenMiddleware = require('../helpers/tokken-middleware')


//USER
const registerUser = require('./register-user')
const authenticateUser = require('./authenticate-user')
const retriveteUser = require('./retrieve-user')

router.post('/users' , jsonBodyParser , registerUser)
router.post('/auth' , jsonBodyParser , authenticateUser)
router.get('/users' , tokenMiddleware , retriveteUser)


//CATEGORY
const registerCategory = require('./register-category')
const updateCategory = require('./update-category')
const retrieveCategories = require('./retrieve-categories')
const deleteCategory = require('./delete-category')

router.post("/category" , [tokenMiddleware , jsonBodyParser] , registerCategory)
router.get("/category" , tokenMiddleware , retrieveCategories)
router.patch("/category/:categoryId" , jsonBodyParser , updateCategory)
router.delete("/category/:categoryId" , deleteCategory)


//TASK
const registerTask = require('./register-task')
const retrieveTasksByCategory = require('./retrieve-tasks-by-category')
const deleteTasksByCategory = require('./delete-tasks-by-category')
const retrieveTasksByUser = require('./retrieve-tasks-by-user')
const updateTask = require('./update-task')
const deleteTask = require('./delete-task')

router.post('/tasks/:categoryId' , jsonBodyParser , registerTask)
router.get('/category' , [tokenMiddleware , jsonBodyParser] , retrieveTasksByCategory)
router.delete('/category' , [tokenMiddleware , jsonBodyParser] , deleteTasksByCategory)
router.get('/users/tasks' , tokenMiddleware , retrieveTasksByUser)
router.patch('/tasks/:taskId' , jsonBodyParser , updateTask)
router.delete('/tasks/:taskId' , deleteTask)

module.exports = router