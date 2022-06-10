const { favoriteController } = require("../../controllers/user");
const favoriteRouter = require("express").Router();

favoriteRouter.post("/", favoriteController.create);
favoriteRouter.delete("/:idParkingLot", favoriteController.deleteOne);
favoriteRouter.get("/user/:idUser", favoriteController.getByUser);

module.exports = favoriteRouter;
