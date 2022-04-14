const { BlockController } = require("../controllers");
const BlockRouter = require("express").Router();

BlockRouter.post("/", BlockController.create);
BlockRouter.get("/", BlockController.getAll);
BlockRouter.get("/:id", BlockController.getById);

module.exports = BlockRouter;
