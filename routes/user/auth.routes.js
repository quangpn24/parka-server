const { authController } = require("../../controllers/auth/index");
const authRouter = require("express").Router();

authRouter.post("/register", authController.register);
authRouter.post("/loginoauth", authController.loginWithOAuth);
authRouter.post("/signin", authController.login);
authRouter.post("/refreshtoken", authController.refreshToken);
authRouter.patch("/reset-password", authController.resetPassword);

module.exports = authRouter;
