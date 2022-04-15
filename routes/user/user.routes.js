const { userController } = require("../../controllers/user");
const verifyToken = require("../../middlewares/verifyToken");
const userRouter = require("express").Router();

userRouter.post("/", userController.create);
userRouter.post("/checkemail", userController.checkDuplicateEmail);
userRouter.get("/", userController.getAllUser);
userRouter.get("/:idUser", [verifyToken], userController.getById);

module.exports = userRouter;
