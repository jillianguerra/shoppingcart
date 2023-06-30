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

// exports.addItemToCart = async(req, res) => {
//     try {
//         const cart = await Cart.findOne({ _id: req.user.cart })
//         const item = await Item.findOne({ _id: req.params.id })
//         cart.items ?
//         cart.items.addToSet(item):
//         cart.items = [item]
//         await cart.save()
//         res.json(cart)
//     } catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// // }
// exports.addItemToCart = async(req, res, next) => {
//     try {
//         const cart = await Cart.findOne({ _id: req.user.cart })
//         const item = await Item.findOne({ _id: req.params.id })
//         if (!cart.items.length) {
//             cart.items = [item]
//         } else if (cart.items.includes(item._id)) {
//             const index = cart.items.indexOf(item._id)
//             cart.items[index].quantity ++
//             item.save()
//         } else {
//             cart.items.addToSet(item)
//         }
//         await cart.save()
//         res.json(cart)
//     } catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// }
exports.addItemToCart = async(req, res, next) => {
    try {
        const cart = await Cart.findOne({ _id: req.user.cart })
        const item = await Item.findOne({ _id: req.params.id })
        const itemList = new ItemList(item)
        await itemList.save()
        itemList.addItemToCart(item._id)
        res.json(cart)
    } catch (error) {
        res.status(400).json({ message: `Nah that ain't it.`})
    }
}

// populate()
// const id = 765
// const arr = [{id: 765}, {id: 765}, {id: 357}]
// if(
// arr.filter(item => item.id === id).length > 0){ logic stuff}