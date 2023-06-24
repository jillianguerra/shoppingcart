const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController')
const userController = require('../controllers/userController')

router.post('/new', cartController.createCart)
router.get('/:id', cartController.showCart)
router.put('/:id', userController.auth, cartController.updateCart)
router.delete('/:id', userController.auth, cartController.deleteCart)

module.exports = router