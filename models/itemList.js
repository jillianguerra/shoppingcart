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
// itemListSchema.methods.addItem = async function(itemId, cartId) {
//     const cart = await Cart.findOne({ _id: cartId })
//     const item = await Item.findOne({ _id: itemId })
//     const itemList = cart.items.find(itemList => itemList.item._id.equals(itemId))
//     if (itemList){
//         itemList.quantity += 1
//     } else {
//         cart.items.addToSet(item)
//     }
//     return cart.save()
// }
// itemListSchema.methods.setItemQuantity = async function(newQty) {
//     console.log('sup')
//     const cart = await Cart.findOne({ _id: this.cart }).populate('items')
//     console.log('newQty', newQty)
//     // console.log('cart', cart)
//     if (newQty <= 0) {
//         console.log('deleted')
//         cart.remove(this)
//     } else {
//         this.quantity = newQty
//         await this.save()
//     }
//     return cart.save()
// }
itemListSchema.pre('save', async function(next) {
    if(this.isModified('quantity')) {
        const cart = await Cart.findOne({ _id: this.cart })
        const item = await Item.findOne({ _id: this.item })
        let product = 0
        product += this.quantity * item.price 
        this.total = product
        await cart.save()
    }
    next()
})

const ItemList = model('ItemList', itemListSchema)
module.exports = ItemList