const { userInfo } = require('os')
const Item = require('../models/item')

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
        const item = await Item.findOne({ _id: req.params._id })
        res.json(item)
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
        await req.item.deleteOne()
        res.json({ message: `It's gone`})
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
// router.get('/', itemController.showIndex)
exports.showIndex = async (req, res) => {
    try {
        const foundItems = await userInfo.find({})
        res.json(foundItems)
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}