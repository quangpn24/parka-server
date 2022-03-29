const { AuthController } = require("../controllers");
const authRouter = require("express").Router();

authRouter.post("/signin", AuthController.login);
authRouter.post("/refreshtoken", AuthController.refreshToken);

module.exports = authRouter;
