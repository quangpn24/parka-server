const { ParkingReservation } = require("../../models");

const getById = async (req, res) => {
  try {
    const { idParkingReservation } = req.params;
    const parkingReservation = await ParkingReservation.findByPk(idParkingReservation);

    return res.send({
      message: "Successfully!!",
      data: parkingReservation,
    });
  } catch (error) {
    return res.send({
      message: error,
      data: "",
    });
  }
};

module.exports = { getById };
