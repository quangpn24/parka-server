const {UserController}  = require('../controllers');
const userRouter = require('express').Router();

userRouter.get('/', UserController.getAllUser);

module.exports = userRouter