const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController')
const userController = require('../controllers/userController')

router.post('/checkout', userController.auth, cartController.checkOut)
router.get('/history', userController.auth, cartController.showHistory)
router.get('/', userController.auth, cartController.showCart)
router.put('/', userController.auth, cartController.updateItemInCart)

module.exports = router