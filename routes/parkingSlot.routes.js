const { ParkingSlotController } = require("../controllers");
const parkingSlotRouter = require("express").Router();

parkingSlotRouter.post("/", ParkingSlotController.create);
parkingSlotRouter.get("/", ParkingSlotController.getAll);
parkingSlotRouter.get("/:id", ParkingSlotController.getById);

module.exports = parkingSlotRouter;
