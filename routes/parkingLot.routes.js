const { ParkingLotController } = require("../controllers");
const parkingLotRouter = require("express").Router();

parkingLotRouter.post("/", ParkingLotController.create);
parkingLotRouter.get("/", ParkingLotController.getAll);
parkingLotRouter.get("/:id", ParkingLotController.getById);

module.exports = parkingLotRouter;
