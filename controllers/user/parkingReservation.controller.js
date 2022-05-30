const { ParkingReservation } = require("../../models");

const create = async (req, res) => {
  try {
    const { body } = req;
    // Validate request
    if (!body) {
      res.status(400).send({
        message: "Content can not be empty!",
        data: "",
      });
      return;
    }

    const parkingReservation = {
      idVehicle: body.idVehicle,
      idParkingSlot: body.idParkingSlot,
      startTime: body.startTime,
      bookingDate: body.bookingDate,
      duration: body.duration,
    };

    const newReservation = await ParkingReservation.create(parkingReservation);
    res.status(200).send({
      message: "Successfully",
      data: newReservation,
    });
  } catch (error) {
    res.status(400).send({
      message: error,
      data: "",
    });
    return;
  }
};

const getById = async (req, res) => {
  try {
    const { idParkingReservation } = req.params;
    const reservation = await ParkingReservation.findByPk(idParkingReservation);
    res.status(200).send({
      message: "Successfully",
      data: reservation,
    });
  } catch (error) {
    res.status(400).send({
      message: error,
      data: "",
    });
    return;
  }
};

const getByIdUser = async (req, res) => {
  try {
    const { idUser } = req.params;
    const reservations = await ParkingReservation.findAll({
      where: {
        idUser: idUser,
      },
    });

    res.status(200).send({
      message: "Successfully",
      data: reservations,
    });
  } catch (error) {
    res.status(400).send({
      message: error,
      data: "",
    });
    return;
  }
};

const update = async (req, res) => {
  try {
    const { idParkingReservation } = req.params;
    const updatedData = await ParkingReservation.update(req.body, {
      where: {
        idParkingReservation: idParkingReservation,
      },
      returning: true,
    });

    res.status(200).send({
      message: "Successfully",
      data: updatedData[1][0],
    });
  } catch (error) {
    res.status(400).send({
      message: error,
      data: "",
    });
  }
};

module.exports = { create, getByIdUser, getById, update };
