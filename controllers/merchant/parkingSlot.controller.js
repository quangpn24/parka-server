const { ParkingSlot } = require("../../models");

const create = async (req, res) => {
  try {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
        data: "",
      });
      return;
    }

    // Create a ParkingSlot
    const parkingSlot = {
      slotNumber: req.body.slotNumber,
      idBlock: req.body.idBlock,
    };

    // Save
    const newParkingSlot = await ParkingSlot.create(parkingSlot);
    res.status(200).send({
      message: "Successfully",
      data: newParkingSlot,
    });
  } catch (error) {
    res.status(400).send({
      message: error,
      data: "",
    });
    return;
  }
};

const getAll = async (req, res) => {
  try {
    const parkingSlots = await ParkingSlot.findAll();
    res.status(200).send({
      message: "Successfully",
      data: parkingSlots,
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
    const { idParkingSlot } = req.params;
    const parkingSlot = await ParkingSlot.findByPk(idParkingSlot);
    res.status(200).send({
      message: "Successfully",
      data: parkingSlot,
    });
  } catch (error) {
    res.status(400).send({
      message: error,
      data: "",
    });
    return;
  }
};

module.exports = { create, getAll, getById };
