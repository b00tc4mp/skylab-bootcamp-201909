require('dotenv').config()
const { env: { DB_URL_TEST } } = process
const { expect } = require('chai')
const createTeam = require('.')
const { random } = Math
const { database, models: { User, Team, Lesson } } = require('pyrene-ski-data')

describe('logic - create lesson', () => {
    before(() => database.connect(DB_URL_TEST))

    let id, name, surname, email, username, password, role = "admin", teamName, teamActivity





})