const { blockController } = require("../../controllers/merchant");

const blockRouter = require("express").Router();

blockRouter.post("/create", blockController.create);
blockRouter.get("/", blockController.getAllByIdParking);
blockRouter.get("/:id", blockController.getById);
blockRouter.patch("/update", blockController.update);

module.exports = blockRouter;
