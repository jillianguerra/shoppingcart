require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    loggedIn: Boolean,
    cart: {type: mongoose.Schema.Types.ObjectId, ref: 'Cart'}
})

userSchema.pre('save', async function(next) {
    if(this.isModified('password')) {
        // before changing the password, run this function
        this.password = await bcrypt.hash(this.password, 8)
        // uses bcrypt to make an encrypted version of the password to save to the database instead of the real password
    }
    next()
})
userSchema.methods.generateAuthToken = async function() {
    const token = jwt.sign({_id: this._id}, process.env.SECRET, {expiresIn: '24h'})
    // creates a token using json web token, the token expires in 24 hours, the secret comes from the .env file
    return token
}
const User = mongoose.model('User', userSchema)
module.exports = User