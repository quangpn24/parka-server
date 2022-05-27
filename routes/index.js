const express = require("express");
const authRouter = require("./auth/auth.routes");
const customerRouter = require("./customer/parkingLot.routes");
const userRouter = require("./user");
const merchantRouter = require("./merchant");

const apiRouter = express();

apiRouter.use("/auth", authRouter);
apiRouter.use("/customer", customerRouter);
apiRouter.use("/merchant", merchantRouter);
apiRouter.use("/user", userRouter);

module.exports = apiRouter;
