const express = require('express')
const router = express.Router()
const itemController = require('../controllers/itemController')
const userController = require('../controllers/userController')
const reviewController = require('../controllers/reviewController')

router.post('/new', userController.checkAdmin, itemController.createItem)
router.get('/', itemController.showIndex)
router.get('/all/:category', itemController.showCategory)
router.get('/:id', itemController.showItem)
router.put('/:id', userController.checkAdmin, itemController.updateItem)
router.delete('/:id', userController.checkAdmin, itemController.deleteItem)
router.post('/:id', userController.auth, itemController.addItemToCart)

router.get('/:id/reviews', reviewController.showItemReviews)
router.post('/:id/reviews', userController.auth, reviewController.createReview)
router.put('/:id/reviews', userController.auth, reviewController.editReview)
router.delete('/:id/reviews', userController.auth, reviewController.deleteReview)

module.exports = router