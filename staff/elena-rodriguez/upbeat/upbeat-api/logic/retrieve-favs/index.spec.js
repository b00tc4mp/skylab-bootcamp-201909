require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const retrieveFavs = require('.')
const { errors: { NotFoundError } } = require('upbeat-util')
const { database, models: { User } } = require('upbeat-data')
const bcrypt = require('bcryptjs')

describe('logic - retrieve-favs', () => {
    before(() => database.connect(TEST_DB_URL))
    let username, email, password, rol, rols, longitude, latitude, instruments, groups, favs, username1, email1, password1, rol1, longitude1, latitude1, instruments1, groups1, favs1
    rols = ['solo', 'groups']
    instrumentsList = ['drums', 'guitar', 'piano', 'violin', 'bass', 'cello', 'clarinet', 'double-bass', 'flute', 'oboe', 'saxophone', 'trombone', 'trumpet', 'ukelele', 'viola', 'voice']
    groupsList = ['band', 'choir', 'modern-ensemble', 'orchestra', 'classic-chamber']
    
    beforeEach( async() => {debugger
        username = `username-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        rol = rols[Math.floor(Math.random() * rols.length)]
        longitude = random()
        latitude = random()
        instruments = [instrumentsList[Math.floor(Math.random() * instrumentsList.length)]]
        groups = groupsList[Math.floor(Math.random() * groupsList.length)]
        /* if (rol === 'solo') format = new Solo({ instruments })
        else format = new Groups({ groups }) */
        //User.create({ username, email, password, rol, format, location: { coordinates: [latitude, longitude] } })
        
        username1 = `username-${random()}`
        email1 = `email-${random()}@mail.com`
        password1 = `password-${random()}`
        rol1 = rols[Math.floor(Math.random() * rols.length)]
        longitude1 = random()
        latitude1 = random()
        instruments1 = [instrumentsList[Math.floor(Math.random() * instrumentsList.length)]]
        groups1 = groupsList[Math.floor(Math.random() * groupsList.length)]
        
        hash = await bcrypt.hash(password, 10)


        await User.deleteMany()
        const user = await User.create({ username, email, password, rol, longitude, latitude, instruments, groups, favs })
        const user1 = await User.create({ username: username1, email: email1, password: password1, rol: rol1, longitude: longitude1, latitude: latitude1, instruments: instruments1, groups: groups1, favs: favs1})
        id = user.id
        id1 = user1.id
        user.favs.push(user1)

        await user.save()
    })

    it('should succeed on correct user id', async () => {

        user = await retrieveFavs(id)
        expect(user).to.exist
        expect(user.favs).to.be.an('array')
        expect(user.favs).to.deep.equal([user1])
        
    })


    // it('should fail on wrong user id', async () => {
    //      id = '012345678901234567890123'
    //     try {
    //         user = await aprovecandidate(id,id1)
    //         throw Error('should not reach this point')
    //     } catch (error) {
    //         expect(error).to.exist
    //         expect(error).to.be.an.instanceOf(NotFoundError)
    //         expect(error.message).to.equal(`user with id ${id1} not found`)
    //     }
    // })
    // TODO other cases
    after(() => User.deleteMany().then(database.disconnect))
})