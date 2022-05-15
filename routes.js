const express = require('express')
const router = express.Router()
const pathwayController = require('./controllers/pathway.controller')
const userController = require('./controllers/user.controller')
const {auth} = require('./middlewares/auth')

router.get('/users',  userController.getAllUsers.action)

router.post('/register',userController.create.action)

 router.post('/login', userController.loginUser.action);

router.get('/profile',auth,userController.getUser.action)

router.get('/logout',auth,userController.logoutUser.action)

router.post('/pathway', pathwayController.createPathway.action)

router.get('/pathway',  pathwayController.getPathway.action)

module.exports = router