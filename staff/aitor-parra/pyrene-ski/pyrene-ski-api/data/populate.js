require('dotenv').config()
const { database, models: { User } } = require('pyrene-ski-data')
const { env: { DB_URL } } = process;

(async () => {
    try {
        await database.connect(DB_URL)

        await users.deleteMany()

        const user = new User({
            name: 'admin79',
            surname: 'admin79',
            email: 'admin@mail.com',
            username: 'ADMIN79',
            password: '79',
            role: 'admin',
            teams:[],
            lessons:[],
            lessontobuy:[]

        })

        await user.save()
    } catch (error) {
        console.error(error)
    }
})()