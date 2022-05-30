const express = require("express");
const userRouter = require("./user.routes");
const authRouter = require("./auth.routes");
const vehicleRouter = require("./vehicle.routes");
const parkingReservationRouter = require("./parkingReservation.routes");
const parkingSlipRouter = require("./parkingSlip.routes");
const parkingLotRouter = require("./parkingLot.routes");
const timeFrameRouter = require("./timeFrame.routes");
const parkingSlotRouter = require("./parkingSlot.routes");

const userRoute = express();

userRoute.use("/auth", authRouter);
userRoute.use("/users", userRouter);
userRoute.use("/vehicles", vehicleRouter);
userRoute.use("/reservations", parkingReservationRouter);
userRoute.use("/slips", parkingSlipRouter);
userRoute.use("/lots", parkingLotRouter);
userRoute.use("/time", timeFrameRouter);
userRoute.use("/slot", parkingSlotRouter);

module.exports = userRoute;
