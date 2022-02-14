const { UserController } = require("../controllers");
const { isAdmin } = require("../middlewares/verifyRole");
const verifyToken = require("../middlewares/verifyToken");
const userRouter = require("express").Router();

userRouter.post("/", UserController.create);
userRouter.post("/checkemail", UserController.checkDuplicateEmail);
userRouter.get("/", UserController.getAllUser);
userRouter.get("/:idUser", [verifyToken], UserController.getById);

module.exports = userRouter;
