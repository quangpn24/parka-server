const {
  ParkingReservation,
  Vehicle,
  TimeFrame,
  ParkingSlot,
  Block,
  ParkingLot,
} = require("../../models");

const getById = async (req, res) => {
  try {
    const { idParkingReservation } = req.params;
    const parkingReservation = await ParkingReservation.findByPk(idParkingReservation, {
      include: [
        {
          model: ParkingSlot,
          attributes: ["slotNumber"],
          include: {
            model: Block,
            attributes: ["blockCode"],
            include: { model: ParkingLot, attributes: ["name", "address"] },
          },
        },
        { model: Vehicle, attributes: ["name", "number"] },
        { model: TimeFrame, attributes: ["duration", "cost"] },
      ],
    });

    if (parkingReservation) {
      return res.send({
        message: "Successfully!!",
        data: parkingReservation,
      });
    } else {
      return res.send({
        message: "You have not booked in advance",
        data: "",
      });
    }
  } catch (error) {
    return res.send({
      message: error,
      data: "",
    });
  }
};

module.exports = { getById };
