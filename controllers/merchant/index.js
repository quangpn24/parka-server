const parkingLotController = require("./parkingLot.controller");
const parkingSlotController = require("./parkingSlot.controller");
const blockController = require("./block.controller");
const authController = require("./auth.controller");
const timeFrameController = require("./timeFrame.controller");
const parkingReservationController = require("./parkingReservation.controller");

module.exports = {
  parkingLotController,
  parkingSlotController,
  blockController,
  authController,
  timeFrameController,
  parkingReservationController,
};
