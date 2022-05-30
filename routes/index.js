const express = require("express");
const userRouter = require("./user");
const merchantRouter = require("./merchant");

const apiRouter = express();

apiRouter.use("/merchant", merchantRouter);
apiRouter.use("/user", userRouter);

module.exports = apiRouter;
