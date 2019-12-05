module.exports = {
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    retrieveBirthdays: require('./retrieve-bday-friend'),
    modifyUser: require('./modify-user'),
    saveProfileImage: require('./save-profile-image'),
    createWish: require('./create-wish'),
    saveWishImage: require('./save-wish-image'),
    modifyWish: require('./modify-wish'),
    removeWish: require('./delete-wish'),
    givenWish: require('./given-wish')
}