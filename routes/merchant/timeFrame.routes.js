const { timeFrameController } = require("../../controllers/merchant");
const timeFrameRouter = require("express").Router();

timeFrameRouter.get("/:idParkingLot/time-frame", timeFrameController.getTimeFrameByIdLot);
timeFrameRouter.post("/create", timeFrameController.create);
timeFrameRouter.patch("/update", timeFrameController.update);

module.exports = timeFrameRouter;
