module.exports = {
    authenticateUser: require('./authenticate-user'),
    registerUser: require('./register-user'),
    retrieveUser: require('./retrieve-user'),
    deleteUser: require('./delete-user'),
    editUser: require('./edit-user'),
    createPractice: require('./create-practice'),
    retrievePendingPractices: require('./retrieve-pending-practices'),
    retrieveDonePractices: require('./retrieve-done-practices'),
    retrieveCancelledPractices: require('./retrieve-cancelled-practices')
}
