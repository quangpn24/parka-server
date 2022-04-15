const { authController } = require("../../controllers/merchant");
const authRouter = require("express").Router();

authRouter.post("/", authController.signUp);

module.exports = authRouter;
