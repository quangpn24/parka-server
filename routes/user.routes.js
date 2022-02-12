const { UserController } = require("../controllers");
const userRouter = require("express").Router();

userRouter.post("/", UserController.create);
userRouter.get("/", UserController.getAllUser);

module.exports = userRouter;
