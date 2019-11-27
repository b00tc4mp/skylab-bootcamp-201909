api.post('/team', tokenVerifier, jsonBodyParser, (req, res) => {
    try {

        createTeam()

    } catch ({}) {

    }

})

api.get('/team', tokenVerifier, (req, res) => {
    try {

        removeTeam()

    } catch ({}) {

    }

})



api.post('/lesson', tokenVerifier, jsonBodyParser, (req, res) => {
    try {

        addLesson()

    } catch ({}) {

    }

})

api.get('/lesson', tokenVerifier, (req, res) => {
    try {

        deleteLesson()

    } catch ({}) {

    }

})

api.get('/listlesson', tokenVerifier, (req, res) => {
    try {

        listLesson()

    } catch ({}) {

    }

})

api.post('/bookleeson', tokenVerifier, (req, res) => {
    try {

        bookLesson()

    } catch ({}) {

    }

})
