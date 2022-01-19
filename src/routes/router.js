const express = require('express');
const userRouter = require('./user.routes');

module.exports = apiRoute => {
    apiRoute.use("/user", userRouter)
}