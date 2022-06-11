const { timeFrameController } = require("../../controllers/merchant");
const timeFrameRouter = require("express").Router();

timeFrameRouter.get("/:idParkingLot/time-frame", timeFrameController.getTimeFrameByIdLot);
timeFrameRouter.post("/", timeFrameController.create);
timeFrameRouter.patch("/:idParkingLot", timeFrameController.update);

module.exports = timeFrameRouter;
