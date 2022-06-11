const { procedureController } = require("../../controllers/merchant");
const procedureRouter = require("express").Router();

procedureRouter.put("/check-in", procedureController.checkIn);
procedureRouter.put("/check-out", procedureController.checkOut);

module.exports = procedureRouter;
