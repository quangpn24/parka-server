const { parkingSlipController } = require("../../controllers/merchant");
const parkingSlipRouter = require("express").Router();

parkingSlipRouter.get(
  "/reservation/:idParkingReservation",
  parkingSlipController.getByIdParkingReservation,
);
module.exports = parkingSlipRouter;
