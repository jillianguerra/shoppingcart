const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../app')
const server = app.listen(8080, () => console.log(`Port 8080 is lit`))
const Item = require('../models/item')
const User = require('../models/user')
const Cart = require('../models/cart')
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
        .send({ name: 'lamp', description: 'stop sitting in the dark and get a lamp!', category: 'lighting', price: 40 })
    expect(response.statusCode).toBe(200)
    expect(response.body.name).toEqual('lamp')
    expect(response.body.description).toEqual('stop sitting in the dark and get a lamp!')
    expect(response.body.category).toEqual('lighting')
    expect(response.body.price).toEqual(40)
    })
    test('It should update an item', async () => {
        const item = new Item({ name: 'lamp', description: 'stop sitting in the dark and get a lamp!', category: 'lighting', price: 40 })
        await item.save()
        const response = await request(app)
            .put(`/items/${item._id}`)
            .send({ name: 'fancy lamp', description: `It's like a lamp but so much fancier!`, category: 'lighting', price: 200 })
        expect(response.body.name).toEqual('fancy lamp')
        expect(response.body.description).toEqual(`It's like a lamp but so much fancier!`)
        expect(response.body.price).toEqual(200)
    })
    test('It should display an item', async () => {
        const item = new Item({ name: 'fancy lamp', description: `It's like a lamp but so much fancier!`, category: 'lighting', price: 200 })
        await item.save()
        const response = await request(app)
            .get(`/items/${item._id}`)
    expect(response.body.name).toEqual('fancy lamp')
    expect(response.body.description).toEqual(`It's like a lamp but so much fancier!`)
    expect(response.body.price).toEqual(200)
    })
    test('It should delete an item', async () => {
        const item = new Item({ name: 'fancy lamp', description: `It's like a lamp but so much fancier!`, category: 'lighting', price: 200 })
        await item.save()
        const response = await request(app)
            .delete(`/items/${item._id}`)
        expect(response.statusCode).toBe(200)
        expect(response.body.message).toEqual(`It's gone`)
    })
    test('It should display all items', async() => {
        const item1 = new Item({ name: 'lamp', description: 'stop sitting in the dark and get a lamp!', category: 'lighting', price: 40 })
        await item1.save()
        const item2 = new Item({ name: 'fancy lamp', description: `It's like a lamp but so much fancier!`, category: 'lighting', price: 200 })
        await item2.save()
        const response = await request(app)
            .get('/items')
        expect(response.statusCode).toBe(200)
        expect.objectContaining(item1)
        expect.objectContaining(item2)
    })
})