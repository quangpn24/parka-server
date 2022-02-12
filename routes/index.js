const express = require("express");
const authRouter = require("./auth.routes");
const userRouter = require("./user.routes");

const apiRoute = express();

apiRoute.use("/auth", authRouter);
apiRoute.use("/users", userRouter);

module.exports = apiRoute;
