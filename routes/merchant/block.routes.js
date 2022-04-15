const { blockController } = require("../../controllers/merchant");
const blockRouter = require("express").Router();

blockRouter.post("/", blockController.create);
blockRouter.get("/", blockController.getAll);
blockRouter.get("/:id", blockController.getById);

module.exports = blockRouter;
