const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController')
const userController = require('../controllers/userController')

router.get('/:id', userController.auth, cartController.showCart)
router.put('/:id', userController.auth, cartController.updateItemInCart)
router.post('/:id', userController.auth, cartController.checkOut, cartController.createCart)
module.exports = router