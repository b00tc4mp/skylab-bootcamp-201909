const call = require('../../utils/call')
const { validate, errors: { NotFoundError, CredentialsError } } = require('pyrene-ski-util')
// const { env: { REACT_APP_API_URL: API_URL } } = process
const API_URL = process.env.REACT_APP_API_URL

module.exports = function (token) {
    validate.string(token)
    validate.string.notVoid('token', token)

    return (async () => {debugger
        const res = await call(`${API_URL}/lessons/lessonlist`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if (res.status === 200) {
            const lessons = JSON.parse(res.body)

/*             tasks.forEach(task => {
                task.date = new Date(task.date)

                task.lastAccess = new Date(task.lastAccess)
            }) */

            return lessons
        }

        if (res.status === 401) throw new CredentialsError(JSON.parse(res.body).message)
        
        if (res.status === 404) throw new NotFoundError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)
    })()
}


/* const { validate, errors: { ContentError, ConflictError, NotFoundError} } = require('pyrene-ski-util')
const { ObjectId, models: { User, Lesson  } } = require('pyrene-ski-data')

module.exports = function(id){
    validate.string(id)
    validate.string.notVoid('id', id)
    if(!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    return ( async () => {
        const user = await User.findById(id)

        if(!user) throw new NotFoundError(`user with id ${id} not found`)

        await Lesson.updateMany( { user: id } )

        const lessons = await Lesson.find({ user: id }, { __v: 0 }).populate("teamId").lean()

        lessons.forEach(lesson => {debugger
            lesson.id = lesson._id.toString()
            delete lesson._id
            lesson.user = id
            lesson.activityName = lesson.teamId.teamActivity
            lesson.teamName = lesson.teamId.teamName
            delete lesson.teamId
        })

        return lessons

    }) ()
} */