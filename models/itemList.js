require('dotenv').config()
const { model, Schema } = require('mongoose')
const Item = require('./item.js')

const itemListSchema = new Schema({
    item: Item,
    quantity: {type: Number, default: 1},
    sum: {type: Number, default: 0}
})

itemListSchema.methods.addItemToCart = async function(itemId) {
    const cart = this
    const itemList = cart.items.find(itemList => itemList.item._id.equals(itemId))
    if (itemList){
        itemList.quantity += 1
    } else {
        const item = await mongoose.model('Item').findById(itemId)
        cart.items.push({ item })
    }
    return cart.save()
}
itemListSchema.methods.setItemQuantity = function(itemId, newQty) {
    const cart = this
    const itemList = cart.items.find(itemList => itemList.item._id.equals(itemId))
    if (itemList && newQty <= 0) {
        itemList.remove()
    } else if (itemList) {
        itemList.quantity = newQty
    }
    return cart.save()
}
itemListSchema.pre('save', async function(next) {
    if(this.isModified('quantity')) {
        const item = Item.findOne({ _id: this.item })
        let total = this.quantity * item.price 
        this.sum = total
    }
    next()
})
const ItemList = mongoose.model('ItemList', itemListSchema)
module.exports = ItemList