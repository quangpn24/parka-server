const { authController } = require("../../controllers/merchant");
const authRouter = require("express").Router();

authRouter.post("/signup", authController.signUp);
authRouter.post("/login", authController.login);
authRouter.post("/verify", authController.verify);
authRouter.patch("/password/:idCompany", authController.changePassword);
authRouter.patch("/:idCompany", authController.updateCompany);

module.exports = authRouter;
