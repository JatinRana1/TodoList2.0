const express = require('express')
const userRouter = express.Router()
const { userSignup, userLogin } = require('../controller/userController');

//sign in route
userRouter.post('/signup', userSignup)

//sign up route
userRouter.post('/login', userLogin)

module.exports = userRouter