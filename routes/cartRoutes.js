const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController')
const userController = require('../controllers/userController')

// router.post('/new', userController.auth, cartController.createCart)
router.get('/:id', userController.auth, cartController.showCart)
// router.put('/:id', userController.auth, cartController.updateCart)
// router.delete('/:id', userController.auth, cartController.deleteCart)

module.exports = router