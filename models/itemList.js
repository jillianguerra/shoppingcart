require('dotenv').config()
const { model, Schema } = require('mongoose')
const Item = require('./item')
const Cart = require('./cart')

const itemListSchema = new Schema({
    item: {type: Schema.Types.ObjectId, required: true, ref: 'Item'},
    quantity: {type: Number, default: 0},
    total: {type: Number, default: 0},
    cart: {type: Schema.Types.ObjectId, required: true, ref: 'Cart'}
})

itemListSchema.pre('save', async function(next) {
    // before the itemlist is saved, do this function
    const cart = await Cart.findOne({ _id: this.cart })
    const item = await Item.findOne({ _id: this.item })
    if(this.isModified('quantity')) {
        // when the quantity is changed, do this function
        let product = 0
        product += this.quantity * item.price 
        // product is quantity times price
        this.total = product
    }
    await cart.save()
    // trigger the cart pre function
    next()
})

const ItemList = model('ItemList', itemListSchema)
module.exports = ItemList