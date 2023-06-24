const User = require('../models/user')
const Item = require('../models/item')
const Cart = require('../models/cart')

// router.post('/new', cartController.createCart)
exports.createCart = async (req, res) => {
    try {
        req.body.user = req.user._id
        const cart = await Cart.create(req.body)
        req.user.cart = {_id: cart._id}
        await req.user.save()
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
// router.get('/:id', cartController.showCart)
exports.showCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ _id: req.params.id })
        res.json(cart)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
// router.put('/:id', userController.auth, cartController.updateCart)
exports.updateCart = async (req, res) => {
    try {
        const cart = await Cart.findOneAndUpdate({ _id: req.params.id })
        res.json(cart)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
// router.delete('/:id', userController.auth, cartController.deleteCart)
exports.deleteCart = async (req, res) => {
    try {
        const cart = await Cart.findOneAndDelete({ _id: req.params.id })
        res.sendStatus(204)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}