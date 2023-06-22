require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const userRoutes = require('./routes/userRoutes.js')
const itemRoutes = require('./routes/itemroutes.js')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.json())
app.use(morgan('combined'))
app.use('/users', userRoutes)
app.use('/items', itemRoutes)
app.use(methodOverride('_method'))

module.exports = app