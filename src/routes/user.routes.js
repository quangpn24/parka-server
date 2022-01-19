const { UserController } = require('../controllers');
const userRouter = require('express').Router();

userRouter.get('/users', UserController.getAll)

module.export = userRouter;