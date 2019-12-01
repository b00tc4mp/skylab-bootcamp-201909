module.exports = {
    authenticateUser: require('./authenticate-user'),
    registerUser: require('./register-user'),
    retrieveUser: require('./retrieve-user'),
    listUserFavs: require('./list-user-favs'),
    toogleFavPodcast: require('./toogle-fav-podcast'),
    listUserRss: require('./list-user-rss'),
    createRss: require('./create-rss'),
    listRss: require('./list-rss'),
    createPodcast: require('./create-podcast'),
    listPodcastsByRss: require('./list-podcasts'),
    addPodcastToPlaylist: require('./add-podcast-playlist'),
    removePodcastToPlaylist: require('./remove-podcast-playlist'),
    retrievePlaylist: require('./retrieve-playlist')
}
