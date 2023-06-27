require('dotenv').config()
const { model, Schema } = require('mongoose')

const cartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    items: [{ type: Schema.Types.Object, ref: 'Item' }],
    total: { type: Number, default: 0, required: true }
})
//  cartSchema.methods.getTotal = async function(items) {
//      let sum 
//         items.forEach((item) => {
//             sum += item.price
//         })
//     return sum
//  }
const Cart = model('Cart', cartSchema)
module.exports = Cart