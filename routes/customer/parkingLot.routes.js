const { parkingLotController } = require("../../controllers/customer");
const customerRouter = require("express").Router();

customerRouter.post("/search", parkingLotController.searchAdress);

module.exports = customerRouter;
