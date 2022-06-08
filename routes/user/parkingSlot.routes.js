const { parkingSlotController } = require("../../controllers/user");
const parkingSlotRouter = require("express").Router();

parkingSlotRouter.get("/total", parkingSlotController.numOfSlotOfParkingLot);
parkingSlotRouter.get("/use", parkingSlotController.numOfSlotIsUse);
parkingSlotRouter.get("/lots/:idParkingLot", parkingSlotController.getSlots);

module.exports = parkingSlotRouter;
