const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const cartController = require('../controllers/cartController')
const reviewController = require('../controllers/reviewController')

router.post('/new', userController.createUser, cartController.createCart)
router.post('/login', userController.loginUser)
router.post('/logout', userController.auth, userController.logoutUser)
router.put('/:id', userController.auth, userController.updateUser)
router.delete('/:id', userController.auth, userController.deleteUser, cartController.deleteCart)

router.get('/:id/reviews', reviewController.showUserReviews)

module.exports = router