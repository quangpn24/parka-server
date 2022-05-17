const express = require("express");
const authRouter = require("./auth/auth.routes");
const customerRouter = require("./customer/parkingLot.routes");
const userRouter = require("./user/user.routes");

const apiRouter = express();

apiRouter.use("/auths", authRouter);
apiRouter.use("/customer", customerRouter);
apiRouter.use("/users", userRouter);

module.exports = apiRouter;
