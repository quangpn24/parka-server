const { vehicleController } = require("../../controllers/user");
const vehicleRouter = require("express").Router();

vehicleRouter.post("/", vehicleController.create);
vehicleRouter.get("/:idVehicle", vehicleController.getById);
vehicleRouter.patch("/:idVehicle", vehicleController.update);
vehicleRouter.delete("/:idVehicle", vehicleController.deleteOne);

vehicleRouter.get("/user/:idUser", vehicleController.getByIdUser);

module.exports = vehicleRouter;
