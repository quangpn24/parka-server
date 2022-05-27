const express = require("express");
const parkingLotRouter = require("./parkingLot.routes");
const timeFrameRouter = require("./timeFrame.routes");
const slotRouter = require("./slot.routes");

const customerRouter = express();

customerRouter.use("/lots", parkingLotRouter);
customerRouter.use("/time", timeFrameRouter);
customerRouter.use("/slot", slotRouter);

module.exports = customerRouter;
