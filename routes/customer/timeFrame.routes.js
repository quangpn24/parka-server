const { timeFrameController } = require("../../controllers/customer");
const timeFrameRouter = require("express").Router();

timeFrameRouter.get("/:idParkingLot/time-frame", timeFrameController.getTimeFrameByIdLot);

module.exports = timeFrameRouter;
