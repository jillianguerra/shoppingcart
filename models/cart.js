require('dotenv').config()
const { model, Schema } = require('mongoose')

const cartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    items: [{ type: Schema.Types.ObjectId, ref: 'ItemList' }],
    total: { type: Number, default: 0 },
    isPaid: { type: Boolean, default: false}
})
cartSchema.pre('save', async function(next) {
    // every time the cart is saved, do this function first
    await this.populate('items')
        let sum = 0
        this.items.forEach((item) => {
            sum += item.total
        })
        // add the item total from each item to the sum
        this.total = sum
        // set the total to the sum of all items price
    next()
})
const Cart = model('Cart', cartSchema)
module.exports = Cart