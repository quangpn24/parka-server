const { AuthController } = require('../controllers');
const authRouter = require('express').Router();

authRouter.post('/register', AuthController.register);
authRouter.post('/login', AuthController.login);
authRouter.post('/loginoauth', AuthController.loginWithOAuth);

module.exports = authRouter;
