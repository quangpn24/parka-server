const { parkingLotController } = require("../../controllers/customer");
const parkingLotRouter = require("express").Router();

parkingLotRouter.post("/search", parkingLotController.searchAdress);
parkingLotRouter.get("/", parkingLotController.getAll);

module.exports = parkingLotRouter;
