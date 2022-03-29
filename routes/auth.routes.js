const { AuthController } = require("../controllers");
const authRouter = require("express").Router();

authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);
authRouter.post("/loginoauth", AuthController.loginWithOAuth);
authRouter.post("/signin", AuthController.login);
authRouter.post("/refreshtoken", AuthController.refreshToken);

module.exports = authRouter;
