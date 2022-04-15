const { parkingLotController } = require("../../controllers/merchant");
const parkingLotRouter = require("express").Router();

parkingLotRouter.post("/", parkingLotController.create);
parkingLotRouter.get("/", parkingLotController.getAll);
parkingLotRouter.get("/:id", parkingLotController.getById);
parkingLotRouter.delete("/:id", parkingLotController.deleteOne);

module.exports = parkingLotRouter;
