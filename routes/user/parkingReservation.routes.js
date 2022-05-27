const { parkingReservationController } = require("../../controllers/user");
const parkingReservationRouter = require("express").Router();

parkingReservationRouter.post("/", parkingReservationController.create);
parkingReservationRouter.get("/:idParkingReservation", parkingReservationController.getById);
parkingReservationRouter.patch("/:idParkingReservation", parkingReservationController.update);

parkingReservationRouter.get("user/:idUser", parkingReservationController.getByIdUser);

module.exports = parkingReservationRouter;
