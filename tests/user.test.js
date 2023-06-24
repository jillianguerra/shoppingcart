const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../app')
const server = app.listen(7070, () => console.log(`They're taking the hobbits to 7070!`))
const User = require('../models/user')
let mongoServer

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
})

afterAll(async () => {
    await mongoose.connection.close()
    mongoServer.stop()
    server.close()
})

describe('Test the user endpoints', () => {
    test('It should create a new user', async () => {
        const response = await request(app)
        .post('/users/new')
        .send({ name: 'Gandolf the Grey', email: 'greywizard@email.com', password: 'ilovehobbits' })
    expect(response.statusCode).toBe(200)
    expect(response.body.user.name).toEqual('Gandolf the Grey')
    expect(response.body.user.email).toEqual('greywizard@email.com')
    expect(response.body.user.loggedIn).toEqual(false)
    expect(response.body).toHaveProperty('token')
    })
    test('It should log in a user', async () => {
        const user = new User({ name: 'Gandolf the Grey', email: 'greywizard@email.com', password: 'ilovehobbits' })
        await user.save()
        const response = await request(app)
            .post('/users/login')
            .send({ email: 'greywizard@email.com', password: 'ilovehobbits' })
        expect(response.statusCode).toBe(200)
        expect(response.body.user.name).toEqual('Gandolf the Grey')
        expect(response.body.user.email).toEqual('greywizard@email.com')
        expect(response.body.user.loggedIn).toEqual(true)
        expect(response.body).toHaveProperty('token')
    })
    test('It should update a user', async () => {
        const user = new User({ name: 'Gandolf the Grey', email: 'greywizard@email.com', password: 'ilovehobbits' })
        await user.save()
        const token = await user.generateAuthToken()
        const response = await request(app)
            .put(`/users/${user._id}`)
            .set(`Authorization`, `Bearer ${token}`)
            .send({ name: `Gandolf the White`, email: `whitewizard@email.com` })
        expect(response.statusCode).toBe(200)
        expect(response.body.name).toEqual(`Gandolf the White`)
        expect(response.body.email).toEqual(`whitewizard@email.com`)
    })
    test('It should log out a user', async() => {
        const user = new User({name: 'Gandolf the White', email: 'whitewizard@email.com', password: 'ilovehobbits' })
        await user.save()
        const token = await user.generateAuthToken()
        const response = await request(app)
            .post(`/users/logout`)
            .set(`Authorization`, `Bearer ${token}`)
        expect(response.statusCode).toBe(200)
        expect(response.body.name).toEqual('Gandolf the White')
        expect(response.body.loggedIn).toEqual(false)
    })
    test('It should delete auser', async() => {
        const user = new User({name: 'Gandolf the White', email: 'whitewizard@email.com', password: 'ilovehobbits' })
        await user.save()
        const token = await user.generateAuthToken()
        const response = await request(app)
            .delete(`/users/${user._id}`)
            .set('Authorization', `Bearer ${token}`)
        expect(response.statusCode).toBe(200)
        expect(response.body.message).toEqual(`Bye Felicia!`)
    })
})