const express = require('express')
const router = express.Router()
const itemController = require('../controllers/itemController')
const userController = require('../controllers/userController')

router.post('/new', itemController.createItem)
router.get('/:id', itemController.showItem)
router.put('/:id',itemController.updateItem)
router.delete('/:id', itemController.deleteItem)
router.put('/:id', userController.auth, itemController.addItemToCart)
router.get('/', itemController.showIndex)

module.exports = router