const { parkingReservationController } = require("../../controllers/merchant");
const parkingReservationRouter = require("express").Router();

parkingReservationRouter.get("/", parkingReservationController.getAll);
parkingReservationRouter.get("/:idParkingReservation", parkingReservationController.getById);
parkingReservationRouter.patch("/:idParkingReservation", parkingReservationController.update);

parkingReservationRouter.get("/lot/:idParkingLot", parkingReservationController.getByParkingLot);

module.exports = parkingReservationRouter;
