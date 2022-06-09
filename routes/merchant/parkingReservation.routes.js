const { parkingReservationController } = require("../../controllers/merchant");
const parkingReservationRouter = require("express").Router();

parkingReservationRouter.get("/:idParkingReservation", parkingReservationController.getById);
module.exports = parkingReservationRouter;
