const {
  ParkingReservation,
  ParkingLot,
  ParkingSlot,
  Block,
  Vehicle,
  TimeFrame,
} = require("../../models");

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
      idUser: body.idUser,
      idParkingSlot: body.idParkingSlot,
      idTimeFrame: body.idTimeFrame,
      startTime: body.startTime,
      endTime: body.endTime,
      bookingDate: body.bookingDate,
      total: body.total,
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
      include: [
        { model: ParkingSlot, include: { model: Block, include: { model: ParkingLot } } },
        { model: Vehicle },
        { model: TimeFrame },
      ],
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

const getAll = async (req, res) => {
  try {
    const reservations = await ParkingReservation.findAll();
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

module.exports = { create, getByIdUser, getById, update, getAll };
