const express = require("express");
const authRouter = require("./auth/auth.routes");
const customerRouter = require("./customer");
const userRouter = require("./user/user.routes");

const apiRouter = express();

apiRouter.use("/auth", authRouter);
apiRouter.use("/customer", customerRouter);
apiRouter.use("/users", userRouter);

module.exports = apiRouter;
