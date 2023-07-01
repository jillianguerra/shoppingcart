require('dotenv').config()
const app = require('./app')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGO_URI)
mongoose.connection.once('open', () => console.log(`One does not simply log into Mongo`))

app.listen(PORT, () => {
    console.log(`They're taking the hobbits to ${PORT}!!`)
})