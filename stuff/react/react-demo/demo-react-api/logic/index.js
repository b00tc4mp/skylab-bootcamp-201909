module.exports = {
    authenticateUser : require('./authenticate-user'),
    registerUser: require('./register-user'),
    retrieveUser: require('./retrieve-user'),
    registerCategory : require('./register-category'),
    retrieveCategories: require('./retrieve-categories'),
    updateCategory : require('./update-category'),
    deleteCategory : require('./delete-category'),
    registerTask : require('./register-task'),
    retrieveTasksByCategory : require('./retrieve-tasks-by-category'),
    deleteTasksByCategory : require('./delete-tasks-by-category'),
    retrieveTasksByUser : require('./retrieve-tasks-by-user'),
    updateTask : require('./update-task'),
    deleteTask : require('./delete-task')
}