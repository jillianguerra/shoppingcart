const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../app')
const server = app.listen(8080, () => console.log(`8080 Fly you fools`))
const Item = require('../models/item')
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

describe('Test the item endpoints', () => {
    test('It should create a new item', async () => {
    const user = new User({ name: 'Admin', email: 'admin1@email.com', password: 'securepassword', admin: true })
    await user.save()
    const token = await user.generateAuthToken()
    const response = await request(app)
        .post('/items/new')
        .set(`Authorization`, `Bearer ${token}`)
        .send({ name: 'potatoes', description: 'boil em mash em stick em in a stew', category: 'vegetables', price: 5 })
    expect(response.statusCode).toBe(200)
    expect(response.body.name).toEqual('potatoes')
    expect(response.body.description).toEqual('boil em mash em stick em in a stew')
    expect(response.body.category).toEqual('vegetables')
    expect(response.body.price).toEqual(5)
    })
    test('It should update an item', async () => {
        const user = new User({ name: 'Admin', email: 'admin2@email.com', password: 'securepassword', admin: true })
        await user.save()
        const token = await user.generateAuthToken()
        const item = new Item({ name: 'tasty fish', description: 'raw and wriggling', category: 'seafood', price: 10 })
        await item.save()
        const response = await request(app)
            .put(`/items/${item._id}`)
            .set(`Authorization`, `Bearer ${token}`)
            .send({ name: 'ruined fish', description: `Samwise cooked it`, category: 'seafood', price: 20 })
        expect(response.body.name).toEqual('ruined fish')
        expect(response.body.description).toEqual(`Samwise cooked it`)
        expect(response.body.price).toEqual(20)
    })
    test('It should display an item', async () => {
        const item = new Item({ name: 'bacon', description: `nice crispy bacon`, category: 'meats', price: 10 })
        await item.save()
        const response = await request(app)
            .get(`/items/${item._id}`)
    expect(response.body.name).toEqual('bacon')
    expect(response.body.description).toEqual(`nice crispy bacon`)
    expect(response.body.price).toEqual(10)
    })
    test('It should delete an item', async () => {
        const user = new User({ name: 'Admin', email: 'admin3@email.com', password: 'securepassword', admin: true })
        await user.save()
        const token = await user.generateAuthToken()
        const item = new Item({ name: 'the one ring', description: `It rules them all`, category: 'jewelery', price: 1000000 })
        await item.save()
        const response = await request(app)
            .delete(`/items/${item._id}`)
            .set(`Authorization`, `Bearer ${token}`)
        expect(response.statusCode).toBe(200)
        expect(response.body.message).toEqual(`It's gone`)
    })
    test('It should display all items', async() => {
        const item1 = new Item({ name: `Legolas' bow`, description: 'you have it', category: 'weapons', price: 500 })
        await item1.save()
        const item2 = new Item({ name: `Ghimli's ax`, description: `you have it as well`, category: 'weapons', price: 500 })
        await item2.save()
        const response = await request(app)
            .get('/items')
        expect(response.statusCode).toBe(200)
        expect.objectContaining(item1)
        expect.objectContaining(item2)
    })
    test('It should display all items in a category', async() => {
        const item1 = new Item({ name: `Legolas' bow`, description: 'you have it', category: 'weapons', price: 500 })
        await item1.save()
        const item2 = new Item({ name: `Ghimli's ax`, description: `you have it as well`, category: 'weapons', price: 500 })
        await item2.save()
        const response = await request(app)
            .get('/items/all/weapons')
        expect(response.statusCode).toBe(200)
        expect.objectContaining(item1)
        expect.objectContaining(item2)
    })
})