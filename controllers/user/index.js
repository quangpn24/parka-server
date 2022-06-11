const userController = require("./user.controller");
const vehicleController = require("./vehicle.controller");
const parkingReservationController = require("./parkingReservation.controller");
const parkingSlipController = require("./parkingSlip.controller");
const parkingLotController = require("./parkingLot.controller");
const timeFrameController = require("./timeFrame.controller");
const parkingSlotController = require("./parkingSlot.controller");
const blockController = require("./block.controller");
const favoriteController = require("./favorite.controller");

module.exports = {
  userController,
  vehicleController,
  parkingReservationController,
  parkingSlipController,
  parkingLotController,
  parkingSlotController,
  timeFrameController,
  blockController,
  favoriteController,
};
