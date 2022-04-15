const { parkingSlotController } = require("../../controllers/merchant");
const parkingSlotRouter = require("express").Router();

parkingSlotRouter.post("/", parkingSlotController.create);
parkingSlotRouter.get("/", parkingSlotController.getAll);
parkingSlotRouter.get("/:id", parkingSlotController.getById);

module.exports = parkingSlotRouter;
