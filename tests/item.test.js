const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../app')
const server = app.listen(8080, () => console.log(`Port 8080 is lit`))
const Item = require('../models/item')
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

describe('Test the item endpoints', () => {
    test('It should create a new item', async () => {
        const response = await request(app)
        .post('/items/new')
        .send({ name: 'lamp', description: 'stop sitting in the dark and get a lamp!', price: 40 })
    expect(response.statusCode).toBe(200)
    expect(response.body.item.name).toEqual('lamp')
    expect(response.body.item.description).toEqual('stop sitting in the dark and get a lamp!')
    expect(response.body.item.price).toEqual(40)
    })
})