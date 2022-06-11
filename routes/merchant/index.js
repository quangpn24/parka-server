const express = require("express");
const parkingLotRouter = require("./parkingLot.routes");
const blockRouter = require("./block.routes");
const parkingSlotRouter = require("./parkingSlot.routes");
const authRouter = require("./auth.routes");
const timeFrameRouter = require("./timeFrame.routes");
const parkingReservationRouter = require("./parkingReservation.routes");

const merchantRouter = express();

merchantRouter.use("/lots", parkingLotRouter);
merchantRouter.use("/blocks", blockRouter);
merchantRouter.use("/slots", parkingSlotRouter);
merchantRouter.use("/auth", authRouter);
merchantRouter.use("/time", timeFrameRouter);
merchantRouter.use("/reservations", parkingReservationRouter);

module.exports = merchantRouter;
