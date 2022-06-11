const { Block, ParkingReservation, ParkingSlot, ParkingLot, TimeFrame } = require("../../models");

const getAvailableSlot = async (req, res) => {
  try {
    const { idParkingLot } = req.params;
    console.log({ idParkingLot });
    const slots = await Block.findAll({
      where: { idParkingLot: idParkingLot },
      include: {
        model: ParkingSlot,
      },
    });
    res.send({
      message: "Successfully",
      data: slots,
    });
  } catch (error) {
    res.status(400).send({
      message: error,
      data: "",
    });
    return;
  }
};

module.exports = { getAvailableSlot };
