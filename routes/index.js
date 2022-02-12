const express = require('express');
const authRouter = require('./auth.routes');
const userRouter = require('./user.routes');

module.exports = apiRoute => {
    apiRoute.use("/auth", authRouter)
    apiRoute.use("/users", userRouter)
}