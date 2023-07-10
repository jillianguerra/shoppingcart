const { model, Schema } = require('mongoose')

const reviewSchema = new Schema({
    item: { type: Schema.Types.ObjectId, required: true, ref: 'Item' },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    rating: { type: Number, required: true},
    body: { type: String, required: true}
})
// cartSchema.pre('save', async function(next) {
//     // every time the cart is saved, do this function first
//     await this.populate('items')
//         let sum = 0
//         this.items.forEach((item) => {
//             sum += item.total
//         })
//         // add the item total from each item to the sum
//         this.total = sum
//         // set the total to the sum of all items price
//     next()
// })
const Review = model('Review', reviewSchema)
module.exports = Review