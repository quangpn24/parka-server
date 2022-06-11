const { parkingSlotController } = require("../../controllers/user");
const parkingSlotRouter = require("express").Router();

parkingSlotRouter.get("/total/:idParkingLot", parkingSlotController.numOfSlotOfParkingLot);
parkingSlotRouter.get("/availability/:idParkingLot", parkingSlotController.getAvailableSlots);
parkingSlotRouter.get("/lots/:idParkingLot", parkingSlotController.getSlots);

module.exports = parkingSlotRouter;
