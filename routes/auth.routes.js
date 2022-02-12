const { AuthController } = require("../controllers");
const authRouter = require("express").Router();

authRouter.post("/signin", AuthController.login);

module.exports = authRouter;
