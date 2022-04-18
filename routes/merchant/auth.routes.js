const { authController } = require("../../controllers/merchant");
const authRouter = require("express").Router();

authRouter.post("/register", authController.signUp);
authRouter.post("/login", authController.login);

module.exports = authRouter;
