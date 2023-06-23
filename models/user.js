const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    loggedIn: Boolean,
})

userSchema.pre('save', async function(next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
})
userSchema.methods.generateAuthToken = async function() {
    const token = jwt.sign({_id: this._id}, 'bucketbros', {expiresIn: '24h'})
    return token
}
const User = mongoose.model('User', userSchema)
module.exports = User