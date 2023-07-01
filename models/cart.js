require('dotenv').config()
const { model, Schema } = require('mongoose')

const cartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    items: [{ type: Schema.Types.ObjectId, ref: 'ItemList' }],
    total: { type: Number, default: 0 },
    isPaid: { type: Boolean, default: false}
})
cartSchema.pre('save', async function(next) {
    if(this.isModified('items')) {
        let sum = 0
        this.items.forEach((item) => {
            sum += item.total
        })
        this.total = sum
    }
    next()
})
const Cart = model('Cart', cartSchema)
module.exports = Cart