const express = require("express");
const authRouter = require("./auth.routes");

const apiRouter = express();

apiRouter.use("/auths", authRouter);

module.exports = apiRouter;
