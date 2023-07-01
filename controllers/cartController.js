const User = require('../models/user')
const Item = require('../models/item')
const Cart = require('../models/cart')


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
        const cart = await Cart.findOne({ _id: req.user.cart })
        res.json(cart)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
// router.put('/:id', userController.auth, cartController.updateCart)
exports.updateCart = async(req, res) => {
    try {
        // const updates = Object.keys(req.body)
        // const item = await Item.findOne({ _id: req.params.id })
        // updates.forEach(update => item[update] = req.body[update])
        // await item.save()
        // res.json(item)

        // const cart = await Cart.findOneAndUpdate({ _id: req.params.id })
        const cart = await Cart.findOne({_id: req.params.id })
        const updates = Object.keys(req.body)
        cart.items.forEach()
        
        res.json(cart)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
// router.delete('/:id', userController.auth, cartController.deleteCart)
exports.deleteCart = async(req, res) => {
    try {
        const cart = await Cart.findOneAndDelete({ _id: req.userId })
        res.json({ message: `Bye Felicia!`})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}