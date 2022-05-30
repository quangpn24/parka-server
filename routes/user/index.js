const express = require("express");
const userRouter = require("./user.routes");
const authRouter = require("./auth.routes");
const vehicleRouter = require("./vehicle.routes");
const parkingReservationRouter = require("./parkingReservation.routes");
const parkingSlipRouter = require("./parkingSlip.routes");

const userRoute = express();

userRoute.use("/auth", authRouter);
userRoute.use("/users", userRouter);
userRoute.use("/vehicles", vehicleRouter);
userRoute.use("/reservations", parkingReservationRouter);
userRoute.use("/slips", parkingSlipRouter);

module.exports = userRoute;
