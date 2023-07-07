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
        console.log('hi')
        const cart = await Cart.findOne({ _id: req.user.cart }).populate('items')
        console.log(cart)
        res.json(cart)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
// router.put('/:id', userController.auth, cartController.updateItemInCart)
exports.updateItemInCart = async(req, res) => {
    try {
        const newQty = req.body.quantity
        const cart = await Cart.findOne({ _id: req.user.cart }).populate('items')
        const item = await Item.findOne({ _id: req.body.item })
        const itemList = cart.items.find(itemList => itemList.item.equals(item._id))
        if (newQty <= 0) {
            await ItemList.findOneAndDelete({ _id: itemList._id })
            await cart.save()
        } else {
            itemList.quantity = newQty
            await itemList.save()
            await cart.save()
        }
        res.json(cart)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
exports.deleteCart = async(req, res) => {
    try {
        const cart = await Cart.findOneAndDelete({ _id: req.cart })
        res.json({ message: `Bye Felicia!`})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
// router.put('/checkout', userController.auth, cartController.checkOut)
exports.checkOut = async(req, res) => {
    try {
        const user = req.user
        const cart = await Cart.findOne({ _id: user.cart })
        cart.isPaid = true
        await cart.save()
        const newCart = new Cart({ user: user._id })
        await newCart.save()
        user.cart = newCart._id
        await user.save()
        res.json({cart: cart, message: 'Thank you for your purchase!' })
    } catch (error) {
        res.status(400).json({message: 'nope'})
    }
}
// router.get('/history', userController.auth, cartController.showHistory)
exports.showHistory = async(req, res) => {
    try {
        const carts = await Cart.find({ user: req.user._id, isPaid: true }).populate('items')
        res.json({ carts: carts })
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}