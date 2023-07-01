const User = require('../models/user')
const Item = require('../models/item')
const Cart = require('../models/cart')
const ItemList = require('../models/itemList')


// router.post('/new', cartController.createCart)
exports.createCart = async(req, res) => {
    try {
        req.body.user = req.user._id
        const user = req.user
        const token = req.token
        const cart = await Cart.create(req.body)
        req.user.cart = {_id: cart._id}
        await req.user.save()
        res.json({ user, token, cart})
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
// router.get('/:id', cartController.showCart)
exports.showCart = async(req, res) => {
    try {
        const cart = await Cart.findOne({ _id: req.params.id }).populate('items')
        res.json(cart)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
// router.put('/:id', userController.auth, cartController.updateItemInCart)
exports.updateItemInCart = async(req, res) => {
    try {
        const newQty = req.body.quantity
        const cart = await Cart.findOne({ _id: req.params.id }).populate('items')
        const item = await Item.findOne({ _id: req.body.item })
        const itemList = cart.items.find(itemList => itemList.item.equals(item._id))
        if (newQty <= 0) {
            await ItemList.findOneAndDelete({ _id: itemList._id })
            await cart.save()
        } else {
            itemList.quantity = newQty
            await itemList.save()
        }
        res.json(cart)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
exports.deleteCart = async(req, res) => {
    try {
        const cart = await Cart.findOneAndDelete({ _id: req.user.cart })
        res.json({ message: `Bye Felicia!`})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}