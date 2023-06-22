const express = require('express')
const router = express.Router()
const itemController = require('../controllers/itemController')

router.post('/new', itemController.createItem)
router.get('/:id', itemController.showItem)
router.put('/:id',itemController.updateItem)
router.delete('/:id', itemController.deleteItem)
router.get('/', itemController.showIndex)
