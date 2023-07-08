const Item = require('../models/item')
const Cart = require('../models/cart')
const ItemList = require('../models/itemList')

// router.post('/new', itemController.createItem)
exports.createItem = async (req, res) => {
    try {
        const item = new Item(req.body)
        // grabs the values from the req.body and creates an item
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
        // finds the item id from the url
        res.json(foundItem)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
// router.put('/:id',itemController.updateItem)
exports.updateItem = async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        // grabs the keys from the updates in the req.body
        const item = await Item.findOne({ _id: req.params.id })
        // finds the item based on the url
        updates.forEach(update => item[update] = req.body[update])
        // goes through each update and changes the item from item.key to match the value of req.body.key        await item.save()
        res.json(item)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
// router.delete('/:id', itemController.deleteItem)
exports.deleteItem = async (req, res) => {
    try {
        await Item.findOneAndDelete({ _id: req.params.id })
        // grabs the item from the url and deletes it. boom
        res.json({ message: `It's gone`})
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
// router.get('/', itemController.showIndex)
exports.showIndex = async (req, res) => {
    try {
        const foundItems = await Item.find({})
        // looks for all the items in the database
        res.json({items: foundItems})
    } catch (error) {
        res.status(400).send({ message: `Nothin here` })
    }
}
// router.get('/:category', itemController.showCategory)
exports.showCategory = async(req, res) => {
    try {
        const foundItems = await Item.find({ category: req.params.category })
        // looks for all the items in the database that match the category in the url
        res.json({ items: foundItems })
    } catch (error) {
        res.status(400).send({ message: `We don't have those...` })
    }
}
// router.get('/:id', userController.auth, itemController.addItemToCart)
exports.addItemToCart = async(req, res) => {
    try {
        const cart = await Cart.findOne({ _id: req.user.cart })
        // grabs the cart from the user which we got from auth function
        const item = await Item.findOne({ _id: req.params.id })
        // grabs the item from the database from the url
        cart.items ? await cart.populate('items') : cart.items = []
        // checks if there's a cart.items
        // if there's itemslists in the cart, then populate them so we can use them
        // otherwise, it will make the cart.items an empty array
        let itemList = cart.items.find(itemList => itemList.item.equals(item._id))
        // looks if the cart.items has the current item in the cart or not
            if (itemList) { 
                itemList.quantity += 1 
                // if the item is already in the cart, add one to the quantity
            } else {
                itemList = new ItemList({ item: item._id, cart: cart._id, quantity: 1 })
                // if the item isn't in the cart, it'll come up as undefined. so it creates a new parent property for the item with the quantity 1
                cart.items.addToSet(itemList)
                // add the new item to the cart
            }
        await itemList.save()
        await cart.save()
        res.json(cart)
    } catch (error) {
        res.status(400).json({ message: `Nah that ain't it.`})
    }
}