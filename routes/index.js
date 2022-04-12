const express = require("express");
const authRouter = require("./auth.routes");
const userRouter = require("./user.routes");
const parkingLotRouter = require("./parkingLot.routes");
const blockRouter = require("./block.routes");
const parkingSlotRouter = require("./parkingSlot.routes");

const apiRoute = express();

apiRoute.use("/auths", authRouter);
apiRoute.use("/users", userRouter);
apiRoute.use("/lots", parkingLotRouter);
apiRoute.use("/blocks", blockRouter);
apiRoute.use("/slots", parkingSlotRouter);

module.exports = apiRoute;
