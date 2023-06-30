require('dotenv').config()
const { model, Schema } = require('mongoose')

const cartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    items: [{ type: Object, ref: 'ItemList' }],
    total: { type: Number, default: 0 },
    isPaid: { type: Boolean, default: false}
})
cartSchema.pre('save', async function(next) {
    if(this.isModified('items')) {
        let sum = 0
        this.items.forEach((item) => {
            let price = item.price * item.quantity
            sum += price
        })
        this.total = sum
    }
    next()
})
// cartSchema.method.getCart = function(userId) {
//     const cart = this.findOne({user: userId})
//     return cart
// }
const Cart = model('Cart', cartSchema)
module.exports = Cart