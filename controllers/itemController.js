const Item = require('../models/item')
const User = require('../models/user')
const Cart = require('../models/cart')

// router.post('/new', itemController.createItem)
exports.createItem = async (req, res) => {
    try {
        const item = new Item(req.body)
        await item.save()
        res.json(item)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
// router.get('/:id', itemController.showItem)
exports.showItem = async (req,res) => {
    try {
        const foundItem = await Item.findOne({ _id: req.params.id })
        res.json(foundItem)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
// router.put('/:id',itemController.updateItem)
exports.updateItem = async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        const item = await Item.findOne({ _id: req.params.id })
        updates.forEach(update => item[update] = req.body[update])
        await item.save()
        res.json(item)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
// router.delete('/:id', itemController.deleteItem)
exports.deleteItem = async (req, res) => {
    try {
        const item = await Item.findOne({ _id: req.params.id })
        await item.deleteOne()
        res.json({ message: `It's gone`})
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
// router.get('/', itemController.showIndex)
exports.showIndex = async (req, res) => {
    try {
        const foundItems = await Item.find({})
        res.json({items: foundItems})
    } catch (error) {
        res.status(400).send({ message: `Nothin here` })
    }
}

exports.addItemToCart = async(req, res) => {
    try {
        const user = req.user._id
        const cart = await Cart.findOne({ _id: user.cart })
        const item = await Item.findOne({ _id: req.params.id })
        req.cart.items ?
        req.cart.items.addToSet({ _id: item._id }):
        req.cart.items = [{_id: item._id }]
        await req.cart.save()
        res.json(cart)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}