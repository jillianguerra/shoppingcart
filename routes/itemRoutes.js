const express = require('express')
const router = express.Router()
const itemController = require('../controllers/itemController')
const userController = require('../controllers/userController')

router.post('/new', itemController.createItem)
router.get('/', itemController.showIndex)
router.get('/all/:category', itemController.showCategory)
router.get('/:id', itemController.showItem)
router.put('/:id',itemController.updateItem)
router.delete('/:id', itemController.deleteItem)
router.post('/:id', userController.auth, itemController.addItemToCart)

module.exports = router