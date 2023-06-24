const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    user: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
    items: {type: Array, default: []},
})

const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart