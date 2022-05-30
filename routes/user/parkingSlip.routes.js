const { parkingSlipController } = require("../../controllers/user");
const parkingSlipRouter = require("express").Router();

parkingSlipRouter.post("/", parkingSlipController.create);
parkingSlipRouter.get("/:idParkingSlip", parkingSlipController.getById);
parkingSlipRouter.patch("/:idParkingSlip", parkingSlipController.update);

parkingSlipRouter.get("user/:idUser", parkingSlipController.getByIdUser);

module.exports = parkingSlipRouter;
