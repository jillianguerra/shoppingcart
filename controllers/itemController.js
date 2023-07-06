const Item = require('../models/item')
// const User = require('../models/user')
const Cart = require('../models/cart')
const ItemList = require('../models/itemList')

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
        await Item.findOneAndDelete({ _id: req.params.id })
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
// router.get('/:category', itemController.showCategory)
exports.showCategory = async(req, res) => {
    try {
        const foundItems = await Item.find({ category: req.params.category })
        res.json({ items: foundItems })
    } catch (error) {
        res.status(400).send({ message: `We don't have those...` })
    }
}
// router.get('/:id', userController.auth, itemController.addItemToCart)
exports.addItemToCart = async(req, res) => {
    try {
        const cart = await Cart.findOne({ _id: req.user.cart })
        const item = await Item.findOne({ _id: req.params.id })
        cart.items ? await cart.populate('items') : cart.items = []
        let itemList = cart.items.find(itemList => itemList.item.equals(item._id))
            if (itemList) { 
                itemList.quantity += 1 
            } else {
                itemList = new ItemList({ item: item._id, cart: cart._id, quantity: 1 })
                cart.items.addToSet(itemList)
            }
        await itemList.save()
        await cart.save()
        res.json(cart)
    } catch (error) {
        res.status(400).json({ message: `Nah that ain't it.`})
    }
}