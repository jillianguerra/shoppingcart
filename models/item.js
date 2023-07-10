const { model, Schema } = require('mongoose')

const itemSchema = new Schema({
    name: {type: String, required: true},
    description: String,
    category: {type: String, required: true},
    price: {type: Number, required: true},
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    rating: {type: Number}
})

itemSchema.pre('save', async function(next) {
    // every time the item is saved, do this function first
    await this.populate('reviews')
        let total = 0
        let num = 0
        this.reviews.forEach((review) => {
            num ++
            total += review.rating
        })
        // add all the review ratings together
        // find how many reviews there are
        let average = total / num
        this.rating = average
        // set the total to the sum of all items price
    next()
})

const Item = model('Item', itemSchema)
module.exports = Item