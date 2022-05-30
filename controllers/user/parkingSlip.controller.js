const { ParkingSlip } = require("../../models");

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

    const parkingSlip = {
      idParkingReservation: body.idParkingReservation,
      idUser: body.idUser,
      entryTime: body.entryTime,
      exitTime: body.exitTime,
      cost: body.cost,
      total: body.total,
    };

    const newSlip = await ParkingSlip.create(parkingSlip);
    res.status(200).send({
      message: "Successfully",
      data: newSlip,
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
    const { idParkingSlip } = req.params;
    const slip = await ParkingSlip.findByPk(idParkingSlip);
    res.status(200).send({
      message: "Successfully",
      data: slip,
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
    const slips = await ParkingSlip.findAll({
      where: {
        idUser: idUser,
      },
    });

    res.status(200).send({
      message: "Successfully",
      data: slips,
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
    const { idParkingSlip } = req.params;
    const updatedData = await ParkingSlip.update(req.body, {
      where: {
        idParkingSlip: idParkingSlip,
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
