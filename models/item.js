const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: String,
    price: {type: Number, required: true},
    quantity: {type: Number, default: 1}
})

const Item = mongoose.model('Item', itemSchema)
module.exports = Item