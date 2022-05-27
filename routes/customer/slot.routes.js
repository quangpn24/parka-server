const { slotController } = require("../../controllers/customer");
const slotRouter = require("express").Router();

slotRouter.get("/total", slotController.numOfSlotOfParkingLot);
slotRouter.get("/use", slotController.numOfSlotIsUse);

module.exports = slotRouter;
