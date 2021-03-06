const { parkingReservationController } = require("../../controllers/user");
const parkingReservationRouter = require("express").Router();

parkingReservationRouter.get("/", parkingReservationController.getAll);
parkingReservationRouter.post("/", parkingReservationController.create);
parkingReservationRouter.get("/:idParkingReservation", parkingReservationController.getById);
parkingReservationRouter.patch("/:idParkingReservation", parkingReservationController.update);
parkingReservationRouter.put("/cancel", parkingReservationController.cancel);

parkingReservationRouter.get("/user/:idUser", parkingReservationController.getByIdUser);

module.exports = parkingReservationRouter;
