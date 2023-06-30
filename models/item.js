const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: String,
    category: {type: String, required: true},
    price: {type: Number, required: true},
})

const Item = mongoose.model('Item', itemSchema)
module.exports = Item