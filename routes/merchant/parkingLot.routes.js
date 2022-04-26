const { parkingLotController } = require("../../controllers/merchant");
const parkingLotRouter = require("express").Router();

parkingLotRouter.post("/", parkingLotController.create);
parkingLotRouter.get("/:id", parkingLotController.getAll);
parkingLotRouter.get("/:id", parkingLotController.getById);
parkingLotRouter.patch("/:id", parkingLotController.update);
parkingLotRouter.delete("/:id", parkingLotController.deleteOne);

module.exports = parkingLotRouter;
