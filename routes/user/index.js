const express = require("express");
const userRouter = require("./user.routes");

const userRoute = express();

userRoute.use("/users", userRouter);

module.exports = userRoute;
