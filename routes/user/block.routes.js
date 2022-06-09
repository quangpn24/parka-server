const { blockController } = require("../../controllers/user");
const blockRouter = require("express").Router();

blockRouter.get("/lots/:idParkingLot", blockController.getAvailableSlot);

module.exports = blockRouter;
