const { ParkingSlip, ParkingReservation } = require("../../models");

const getByIdParkingReservation = async (req, res) => {
  try {
    const { idParkingReservation } = req.params;
    const parkingSlip = await ParkingSlip.findOne({
      where: {
        idParkingReservation,
      },
      include: [
        {
          model: ParkingReservation,
        },
      ],
    });

    return res.send({
      message: "Successfully!!",
      data: parkingSlip,
    });
  } catch (error) {
    return res.send({
      message: error,
      data: "",
    });
  }
};

module.exports = { getByIdParkingReservation };
