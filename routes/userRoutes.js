const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/new', userController.createUser)
router.post('/login', userController.loginUser)
router.post('/logout', userController.auth, userController.logoutUser)
router.put('/:id', userController.auth, userController.updateUser)
router.delete('/:id', userController.auth, userController.deleteUser)

module.exports = router