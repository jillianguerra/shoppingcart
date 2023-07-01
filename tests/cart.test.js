const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../app')
const server = app.listen(6060, () => console.log(`Boil em mash em 6060`))
const Cart = require('../models/cart')
const User = require('../models/user')
const Item = require('../models/item')
const ItemList = require('../models/itemList')
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


describe('Test the cart endpoints', () => {
    test('It should add an item to the cart', async () => {
        const user = new User({ name: 'Gollum', email: 'myprecious@email.com', password: 'ilovethatring' })
        await user.save()
        const token = await user.generateAuthToken()
        const item = new Item({ name: 'tasty fish', description: `It's raw and wiggling`, category: 'seafood', price: 5 })
        await item.save()
        const cart = new Cart({ user: user._id })
        await cart.save()
        const response = await request(app)
        .post(`/items/${item._id}`)
        .set(`Authorization`, `Bearer ${token}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.total).toEqual(5)
    })
    test('It should display items in the cart and the total', async () => {
        const user = new User({ name: 'Gimli son of Gloin', email: 'bestaxwarrior@email.com', password: 'iloveaxes' })
        await user.save()
        const token = await user.generateAuthToken()
        const item1 = new Item({ name: `Gimli's ax`, description: `It's like an ax but so much fancier!`, category: 'weapons', price: 500 })
        await item1.save()
        const item2 = new Item({ name: 'dwarf armor', description: 'extra short and extra stout', category: 'armor', price: 500 })
        await item2.save()
        const cart = new Cart({ user: user._id })
        await cart.save()
        const itemList1 = new ItemList({ item: item1._id, quantity: 1, cart: cart._id })
        await itemList1.save()
        const itemList2 = new ItemList({ item: item2._id, quantity: 1, cart: cart._id })
        await itemList2.save()
        cart.items = ([itemList1, itemList2])
        await cart.save()
        const response = await request(app)
            .get(`/cart/${cart._id}`)
            .set(`Authorization`, `Bearer ${token}`)
        expect(response.statusCode).toBe(200)
        expect(response.body.total).toEqual(1000)
    })
})