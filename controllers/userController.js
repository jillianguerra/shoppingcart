require('dotenv').config()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        // find the token
        const data = jwt.verify(token, process.env.SECRET)
        // verify the token
        const user = await User.findOne({ _id: data._id })
        // find the user assigned to the token
        if (!user) {
            throw new Error()
            // if the user is falsey throw an error because there isn't a valid token
        }
        req.user = user
        next()
        // otherwise, send the user for the next step
    } catch (error) {
        res.status(401).send(`We don't know her`)
    }
}
exports.checkAdmin = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.SECRET)
        const user = await User.findOne({ _id: data._id })
        if (!user.admin) {
            throw new Error()
            // if the user is falsey throw an error because there isn't a valid token
        }
        req.user = user
        next()
    } catch (error) {
        res.status(401).send(`Stay in your lane`)
    }
}
exports.createUser = async (req, res, next) => {
    req.body.loggedIn = true
    try {
        const user = new User(req.body)
        // grab the name, email and password from the body and make a new user
        await user.save()
        const token = await user.generateAuthToken()
        // use the user function generate auth token so the user is logged in from the start
        req.user = user
        req.token = token
        next()
        // next goes to a function to create a cart
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        // find the user's unique email
        if (!user || !await bcrypt.compare(req.body.password, user.password)) {
            // checks if the email has a user and if the password is the same
            // sends an error if the email or the password is wrong
            res.status(400).send(`Wrong stuff`)
        } else {
            user.loggedIn = true
            // sets the user to logged in
            await user.save()
            const token = await user.generateAuthToken()
            // makes a token so that the user will pass the auth function test
            res.json({ user, token })
        }
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
exports.logoutUser = async (req, res) => {
    try {
        req.user.loggedIn = false
        // can't touch the token from the backend, so we just set loggedin to false
        await req.user.save()
        res.json(req.user)
    } catch (error) {
        res.status(400).json(`He don't do it.`)
    }
}
exports.updateUser = async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        // grabs the updates keys from the body
        const user = req.user
        // grabs the user from the auth function because I don't wanna write req every time
        updates.forEach(update => user[update] = req.body[update])
        // changes the user.thing to the req.body.thing for all the update keys found
        await user.save()
        res.json(user)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
exports.deleteUser = async (req, res, next) => {
    try {
        const cart = req.user.cart
        await req.user.deleteOne()
        // the auth function already grabbed the user, so now it just deletes
        req.cart = cart
        next()
        // sending the cart out so that it can delete in the next function
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}