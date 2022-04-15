const { authController } = require("../controllers");
const authRouter = require("express").Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/loginoauth", authController.loginWithOAuth);
authRouter.post("/signin", authController.login);
authRouter.post("/refreshtoken", authController.refreshToken);

module.exports = authRouter;
