const User = require('../models/user')
const Item = require('../models/item')
const Cart = require('../models/cart')
const ItemList = require('../models/itemList')


// router.post('/new', cartController.createCart)
exports.createCart = async(req, res) => {
    try {
        const user = req.user
        const token = req.token
        // grabbing stuff from the new user function
        const cart = await Cart.create({ user: user._id })
        // make a cart for the user
        user.cart = { _id: cart._id }
        await user.save()
        // change the user's cart to the new cart and save
        res.json({ user, token, cart})
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
// router.get('/', cartController.showCart)
exports.showCart = async(req, res) => {
    try {
        const cart = await Cart.findOne({ _id: req.user.cart }).populate({
            path: 'items',
            populate: {
                path: 'item'
            }
        })
        // find the cart and populate the items in the cart
        res.json(cart)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
// router.put('/:id', userController.auth, cartController.updateItemInCart)
exports.updateItemInCart = async(req, res) => {
    try {
        // the req.body needs to have a quantity key and an item key that has the item id
        const newQty = req.body.quantity
        // grab the quantity
        const cart = await Cart.findOne({ _id: req.user.cart }).populate('items')
        // grab the cart from the auth function that found our user
        const item = await Item.findOne({ _id: req.body.item })
        // grab the item from the req.body
        const itemList = cart.items.find(itemList => itemList.item.equals(item._id))
        // find the item in the cart
        if (newQty <= 0) {
            await ItemList.findOneAndDelete({ _id: itemList._id })
            // if the quantity is changed to zero, delete from the cart
            await cart.save()
        } else {
            itemList.quantity = newQty
            // change the quantity in the cart to the new quantity
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
        // user is deleted first
        const cart = await Cart.findOneAndDelete({ _id: req.cart })
        // grab the cart from the previous function and delete it
        res.json({ message: `Bye Felicia!`})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
// router.put('/checkout', userController.auth, cartController.checkOut)
exports.checkOut = async(req, res) => {
    try {
        const user = req.user
        // auth function gave us a user
        const cart = await Cart.findOne({ _id: user.cart })
        // grab the cart
        cart.isPaid = true
        // change the cart to paid
        await cart.save()
        const newCart = new Cart({ user: user._id })
        // make a new empty cart
        await newCart.save()
        user.cart = newCart._id
        // set the user cart to the new cart
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
        // find the paid carts and populate the item array
        res.json({ carts: carts })
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}