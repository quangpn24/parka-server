const { blockController } = require("../../controllers/merchant");

const blockRouter = require("express").Router();

blockRouter.post("/", blockController.create);
blockRouter.get("/", blockController.getAllByIdParking);
blockRouter.get("/:id", blockController.getById);
blockRouter.patch("/:idParkingLot", blockController.update);

module.exports = blockRouter;
