const { parkingLotController } = require("../../controllers/user");
const parkingLotRouter = require("express").Router();

parkingLotRouter.post("/search", parkingLotController.searchAdress);
parkingLotRouter.get("/:idParkingLot", parkingLotController.getById);
parkingLotRouter.get("/", parkingLotController.getAll);

module.exports = parkingLotRouter;
