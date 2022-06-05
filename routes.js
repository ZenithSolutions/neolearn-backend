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

router.put('/pathway/:id', pathwayController.addCourseToPathway.action)

router.get('/pathway/:id', pathwayController.fetchPathway.action)

router.put('/pathway/course/:id', pathwayController.addCourseToPathway.action)

router.get('/pathway/course/:id', pathwayController.viewCourseOnPathway.action)

router.post('/course', pathwayController.createNewCourse.action)

router.get('/course', pathwayController.getAllCourse.action)


module.exports = router