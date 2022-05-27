const { parkingLotController } = require("../../controllers/merchant");
const parkingLotRouter = require("express").Router();

parkingLotRouter.post("/", parkingLotController.create);
parkingLotRouter.get("/company/:id", parkingLotController.getAll);
parkingLotRouter.get("/:id", parkingLotController.getById);
parkingLotRouter.patch("/:id", parkingLotController.update);
parkingLotRouter.delete("/:id", parkingLotController.deleteOne);
parkingLotRouter.get("/:id/time-frame", parkingLotController.getTimeFrameByIdLot);
parkingLotRouter.post("/search", parkingLotController.searchAdress);

module.exports = parkingLotRouter;
